package edu.gmxx.share.utils;

import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by BIN on 2017/3/27.
 */
public class MyStringUtil {
    /**
     * 将list数组加入字符返回字符串
     * @param list
     * @param r
     * @return
     */
    public static String listToString(List<String> list, String r){
        StringBuffer sb = new StringBuffer();
        if(list == null){
            return "";
        }
        for(String ls : list){
            sb.append(StringUtils.trimAllWhitespace(ls)).append(StringUtils.isEmpty(r) ? "":r);
        }

        // 移除最后一个分隔符
        if(sb.toString().contains(r)){
            sb.delete(sb.toString().lastIndexOf(r), sb.length());
        }
        return sb.toString();
    }

    /**
     * 获取uuid
     * @return
     */
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 将string数组转换为集合数组
     * @param strs
     * @return
     */
    public static List<String> stringsToList(String[] strs){
        List<String> list = new ArrayList<String>();

        for(String str : strs){
            if(!StringUtils.isEmpty(str)){
                list.add(str);
            }
        }

        return list;
    }

    /**
     * 获取当前时间格式化
     * @param formatter
     * @return
     */
    public static String getTimeFormatter(String formatter){
        SimpleDateFormat sdf = new SimpleDateFormat(formatter);
        return sdf.format(new Date());
    }

    /**
     * 验证手机号码格式
     * @param phone
     * @return
     */
    public static boolean matcherPhone(String phone){
        Pattern p = Pattern.compile("^((13[0-9])|(17[0-9])|(15[0-9])|(18[0-9]))\\d{8}$");
        Matcher m = p.matcher(phone);

        return m.matches();
    }

    /**
     * 生成随机验证码
     * @param length 验证码长度
     * @return
     */
    public static String getRandomCode(int length){
        String code = "";
        Random random = new Random();
        for(int i = 0; i < length; i++){
            code += random.nextInt(10);
        }

        return code;
    }
}
