package edu.gmxx.share.controller;

import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IUserService;
import edu.gmxx.share.utils.MyStringUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 文件上传下载控制类
 * Created by BIN on 2017/3/21.
 */
@Controller
@RequestMapping("file")
public class FileController {
    @Autowired
    private IUserService userService;

    /**
     * 上传头像
     * @param file
     * @param request
     * @return
     */
    @RequestMapping(value = "uploadPortrait.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadPortrait(@RequestParam("file")CommonsMultipartFile file, HttpServletRequest request) throws IOException {
        Map<String, Object> result = new HashMap<String, Object>();

        HttpSession session = request.getSession();
        // 获得项目的路径
        ServletContext sc = session.getServletContext();
        // 上传位置
        String path = sc.getRealPath("/portrait") + "\\"; // 设定文件保存的目录

        String avatarData = request.getParameter("avatarData");
        JSONObject jsonObject = new JSONObject(avatarData);

        File f = new File(path);
        // 判断路径是否存在
        if (!f.exists()){
            f.mkdirs();
        }

        // 获得原始文件名
        String fileName = file.getOriginalFilename();
        // 新文件名
        String newFileName = MyStringUtil.getUUID() + fileName.substring(fileName.lastIndexOf("."));

        File newFile = new File(path + newFileName);
        file.transferTo(newFile);

        /*int x = (int) Math.floor(Double.parseDouble(jsonObject.get("x").toString()));
        int y = (int) Math.floor(Double.parseDouble(jsonObject.get("y").toString()));
        int width = (int) Math.floor(Double.parseDouble(jsonObject.get("width").toString()));
        int height = (int) Math.floor(Double.parseDouble(jsonObject.get("height").toString()));
        cut(path + newFileName, path + "i" + newFileName, x, y, width, height);*/

        User user = (User) session.getAttribute("user");

        // 删除原来的头像路径
        String oldPortrait = sc.getRealPath("/") + user.getPortraitPath();
        File oldFile = new File(oldPortrait);
        if(oldFile.isFile() && oldFile.exists() && !oldPortrait.contains("resources/img/header")){
            oldFile.delete();
        }

        // 调用服务修改用户头像
        user.setPortraitPath("portrait/" + newFileName);
        int count = userService.updateUserById(user);
        if(count == 1){
            session.setAttribute("user", userService.getUserByAccount(user.getAccount()));
            result.put("portraitPath", "\\" + newFileName);
            result.put("msg", "success");
        result.put("result", "portrait/" + newFileName);
        } else{
            result.put("error", "修改图片失败");
        }

        return result;
    }

    /**
     * 多图片上传
     * @param files
     * @param request
     * @return
     */
    @RequestMapping(value = "uploadImgs.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadImgs(@RequestParam("files")List<CommonsMultipartFile> files, HttpServletRequest request) throws IOException {
        Map<String, Object> result = new HashMap<String, Object>();

        // 保存文件路径
        List<String> filePaths = new ArrayList<String>();
        // 获得项目的路径
        ServletContext sc = request.getSession().getServletContext();
        // 上传位置
        String path = sc.getRealPath("/shareImg") + "\\"; // 设定文件保存的目录

        File f = new File(path);
        // 判断路径是否存在
        if (!f.exists()){
            f.mkdirs();
        }

        // 遍历文件
        for(int i = 0; i < files.size(); i++){
            CommonsMultipartFile file = files.get(i);
            // 获得原始文件名
            String fileName = file.getOriginalFilename();
            // 新文件名
            String newFileName = MyStringUtil.getUUID() + "-" + i + fileName.substring(fileName.lastIndexOf("."));
            File newFile = new File(path + newFileName);
            file.transferTo(newFile);

            filePaths.add("shareImg\\" + newFileName);
        }

        result.put("filePaths", filePaths);
        result.put("msg", "success");
        return result;
    }

    /**
     * 上传视频文件
     * @param file
     * @param request
     * @return
     */
    @RequestMapping(value = "uploadVideo.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadVideo(@RequestParam("file")CommonsMultipartFile file, HttpServletRequest request) throws IOException {
        Map<String, Object> result = new HashMap<String, Object>();
        // 获得服务器的路径
        ServletContext sc = request.getSession().getServletContext();
        // 上传位置
        String path = sc.getRealPath("/shareVideo") + "/"; // 设定文件保存的目录

        File f = new File(path);
        // 判断路径是否存在
        if (!f.exists()){
            f.mkdirs();
        }

        // 获得原始文件名
        String fileName = file.getOriginalFilename();
        // 新文件名
        String newFileName = MyStringUtil.getUUID() + fileName.substring(fileName.lastIndexOf("."));

        File newFile = new File(path + newFileName);
        file.transferTo(newFile);

        result.put("filePath", "shareVideo\\" + newFileName);
        result.put("msg", "success");
        return result;
    }

    /**
     * 删除目录下的所有文件
     * @param path
     * @return
     */
    private boolean delAllFile(String path) {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists()) {
            return flag;
        }
        if (!file.isDirectory()) {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            if (path.endsWith(File.separator)) {
                temp = new File(path + tempList[i]);
            } else {
                temp = new File(path + File.separator + tempList[i]);
            }
            if (temp.isFile()) {
                temp.delete();
            }
        }
        return flag;
    }

    /**
     * 改变图片尺寸
     * @param srcFileName 源图片路径
     * @param tagFileName 目的图片路径
     * @param width 修改后的宽度
     * @param height 修改后的高度
     */
    public void zoomImage(String srcFileName,String tagFileName,int width,int height){
        try {
            BufferedImage bi = ImageIO.read(new File(srcFileName));
            BufferedImage tag=new BufferedImage(width,height, BufferedImage.TYPE_INT_RGB);
            tag.getGraphics().drawImage(bi, 0, 0, width, height, null);
            ImageIO.write(tag, "jpg", new File(tagFileName));//画图
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 缩放图像（按高度和宽度缩放）
     * @param srcImageFile 源图像文件地址
     * @param result 缩放后的图像地址
     * @param height 缩放后的高度
     * @param width 缩放后的宽度
     * @param bb 比例不对时是否需要补白：true为补白; false为不补白;
     */
    public void scale(String srcImageFile, String result, int height, int width, boolean bb) {
        try {
            double ratio = 0.0; // 缩放比例
            File f = new File(srcImageFile);
            BufferedImage bi = ImageIO.read(f);
            Image itemp = bi.getScaledInstance(width, height, bi.SCALE_SMOOTH);
            // 计算比例
            if ((bi.getHeight() > height) || (bi.getWidth() > width)) {
                if (bi.getHeight() > bi.getWidth()) {
                    ratio = (new Integer(height)).doubleValue()
                            / bi.getHeight();
                } else {
                    ratio = (new Integer(width)).doubleValue() / bi.getWidth();
                }
                AffineTransformOp op = new AffineTransformOp(AffineTransform
                        .getScaleInstance(ratio, ratio), null);
                itemp = op.filter(bi, null);
            }
            if (bb) {//补白
                BufferedImage image = new BufferedImage(width, height,
                        BufferedImage.TYPE_INT_RGB);
                Graphics2D g = image.createGraphics();
                g.setColor(Color.white);
                g.fillRect(0, 0, width, height);
                if (width == itemp.getWidth(null))
                    g.drawImage(itemp, 0, (height - itemp.getHeight(null)) / 2,
                            itemp.getWidth(null), itemp.getHeight(null),
                            Color.white, null);
                else
                    g.drawImage(itemp, (width - itemp.getWidth(null)) / 2, 0,
                            itemp.getWidth(null), itemp.getHeight(null),
                            Color.white, null);
                g.dispose();
                itemp = image;
            }
            ImageIO.write((BufferedImage) itemp, "JPEG", new File(result));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 图像切割(按指定起点坐标和宽高切割)
     * @param srcImageFile 源图像地址
     * @param result 切片后的图像地址
     * @param x 目标切片起点坐标X
     * @param y 目标切片起点坐标Y
     * @param width 目标切片宽度
     * @param height 目标切片高度
     */
    public void cut(String srcImageFile, String result, int x, int y, int width, int height) {
        try {
            // 读取源图像
            BufferedImage bi = ImageIO.read(new File(srcImageFile));
            int srcWidth = bi.getHeight(); // 源图宽度
            int srcHeight = bi.getWidth(); // 源图高度
            if (srcWidth > 0 && srcHeight > 0) {
                Image image = bi.getScaledInstance(srcWidth, srcHeight,
                        Image.SCALE_DEFAULT);
                // 四个参数分别为图像起点坐标和宽高
                // 即: CropImageFilter(int x,int y,int width,int height)
                ImageFilter cropFilter = new CropImageFilter(x, y, width, height);
                Image img = Toolkit.getDefaultToolkit().createImage(
                        new FilteredImageSource(image.getSource(),
                                cropFilter));
                BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                Graphics g = tag.getGraphics();
                g.drawImage(img, 0, 0, width, height, null); // 绘制切割后的图
                g.dispose();
                // 输出为文件
                ImageIO.write(tag, "JPEG", new File(result));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
