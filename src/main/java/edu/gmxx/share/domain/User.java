package edu.gmxx.share.domain;

import org.springframework.util.StringUtils;

import java.util.Date;

public class User {
    /**
     * 用户ID主键
     */
    private String userId;

    /**
     * 登录账号
     */
    private String account;

    /**
     * 密码
     */
    private String password;

    /**
     * 用户昵称（10个字以内）
     */
    private String nickname;

    /**
     * 用户姓名（10个字以内）
     */
    private String name;

    /**
     * 出生日期
     */
    private Date birthday;

    /**
     * 手机
     */
    private String phone;

    /**
     * 常用邮箱
     */
    private String email;

    /**
     * 所在地区
     */
    private String region;

    /**
     * 
     */
    private String constellation;

    /**
     * 爱好
     */
    private String hobby;

    /**
     * 
     */
    private String portraitPath;

    /**
     * A：小学及以下，B：初中，C：高中，D：中专，E：大专，F：本科，E：硕士研究生，F：博士及以上
     */
    private String eduInfo;

    /**
     * 毕业院校
     */
    private String graduateinstitutions;

    /**
     * 职业信息
     */
    private String occupation;

    /**
     * A：A型血，B：B型血，O：O型血，AB：AB型血，OTHER：其他
     */
    private String bloodType;

    /**
     * 注册时间
     */
    private Date createTime;

    /**
     * 个性签名
     */
    private String signature;

    /**
     * 个人说明
     */
    private String notes;

    /**
     * OFFLINE：离线，ONLINE：在线，LOCK：被锁定
     */
    private String status;

    /**
     * ADMIN：管理员，NORMAL：普通用户
     */
    private String userType;

    /**
     * 被举报次数
     */
    private Integer reportNum;

    /**
     * 密码输入错误连续超过5次账户将被锁定
     */
    private Integer pwdErrorCount;

    /**
     * 记录上一次登录时间
     */
    private Date lastTime;

    /**
     * 账户被锁定后，何时解锁可使用
     */
    private Date unlockTime;

    /**
     * 用户ID主键
     * @return user_id 用户ID主键
     */
    public String getUserId() {
        return userId;
    }

    /**
     * 用户ID主键
     * @param userId 用户ID主键
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * 登录账号
     * @return account 登录账号
     */
    public String getAccount() {
        return account;
    }

    /**
     * 登录账号
     * @param account 登录账号
     */
    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }

    /**
     * 密码
     * @return password 密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 密码
     * @param password 密码
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * 用户昵称（10个字以内）
     * @return nickname 用户昵称（10个字以内）
     */
    public String getNickname() {
        return StringUtils.isEmpty(nickname) ? account : nickname;
    }

    /**
     * 用户昵称（10个字以内）
     * @param nickname 用户昵称（10个字以内）
     */
    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    /**
     * 用户姓名（10个字以内）
     * @return name 用户姓名（10个字以内）
     */
    public String getName() {
        return name;
    }

    /**
     * 用户姓名（10个字以内）
     * @param name 用户姓名（10个字以内）
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 出生日期
     * @return birthday 出生日期
     */
    public Date getBirthday() {
        return birthday;
    }

    /**
     * 出生日期
     * @param birthday 出生日期
     */
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    /**
     * 手机
     * @return phone 手机
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 手机
     * @param phone 手机
     */
    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    /**
     * 常用邮箱
     * @return email 常用邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 常用邮箱
     * @param email 常用邮箱
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * 所在地区
     * @return region 所在地区
     */
    public String getRegion() {
        return region;
    }

    /**
     * 所在地区
     * @param region 所在地区
     */
    public void setRegion(String region) {
        this.region = region == null ? null : region.trim();
    }

    /**
     * 
     * @return constellation 
     */
    public String getConstellation() {
        return constellation;
    }

    /**
     * 
     * @param constellation 
     */
    public void setConstellation(String constellation) {
        this.constellation = constellation == null ? null : constellation.trim();
    }

    /**
     * 爱好
     * @return hobby 爱好
     */
    public String getHobby() {
        return hobby;
    }

    /**
     * 爱好
     * @param hobby 爱好
     */
    public void setHobby(String hobby) {
        this.hobby = hobby == null ? null : hobby.trim();
    }

    /**
     * 
     * @return portrait_path 
     */
    public String getPortraitPath() {
        return portraitPath;
    }

    /**
     * 
     * @param portraitPath 
     */
    public void setPortraitPath(String portraitPath) {
        this.portraitPath = portraitPath == null ? null : portraitPath.trim();
    }

    /**
     * A：小学及以下，B：初中，C：高中，D：中专，E：大专，F：本科，E：硕士研究生，F：博士及以上
     * @return edu_info A：小学及以下，B：初中，C：高中，D：中专，E：大专，F：本科，E：硕士研究生，F：博士及以上
     */
    public String getEduInfo() {
        return eduInfo;
    }

    /**
     * A：小学及以下，B：初中，C：高中，D：中专，E：大专，F：本科，E：硕士研究生，F：博士及以上
     * @param eduInfo A：小学及以下，B：初中，C：高中，D：中专，E：大专，F：本科，E：硕士研究生，F：博士及以上
     */
    public void setEduInfo(String eduInfo) {
        this.eduInfo = eduInfo == null ? null : eduInfo.trim();
    }

    /**
     * 毕业院校
     * @return graduateInstitutions 毕业院校
     */
    public String getGraduateinstitutions() {
        return graduateinstitutions;
    }

    /**
     * 毕业院校
     * @param graduateinstitutions 毕业院校
     */
    public void setGraduateinstitutions(String graduateinstitutions) {
        this.graduateinstitutions = graduateinstitutions == null ? null : graduateinstitutions.trim();
    }

    /**
     * 职业信息
     * @return occupation 职业信息
     */
    public String getOccupation() {
        return occupation;
    }

    /**
     * 职业信息
     * @param occupation 职业信息
     */
    public void setOccupation(String occupation) {
        this.occupation = occupation == null ? null : occupation.trim();
    }

    /**
     * A：A型血，B：B型血，O：O型血，AB：AB型血，OTHER：其他
     * @return blood_type A：A型血，B：B型血，O：O型血，AB：AB型血，OTHER：其他
     */
    public String getBloodType() {
        return bloodType;
    }

    /**
     * A：A型血，B：B型血，O：O型血，AB：AB型血，OTHER：其他
     * @param bloodType A：A型血，B：B型血，O：O型血，AB：AB型血，OTHER：其他
     */
    public void setBloodType(String bloodType) {
        this.bloodType = bloodType == null ? null : bloodType.trim();
    }

    /**
     * 注册时间
     * @return create_time 注册时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 注册时间
     * @param createTime 注册时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 个性签名
     * @return signature 个性签名
     */
    public String getSignature() {
        return signature;
    }

    /**
     * 个性签名
     * @param signature 个性签名
     */
    public void setSignature(String signature) {
        this.signature = signature == null ? null : signature.trim();
    }

    /**
     * 个人说明
     * @return notes 个人说明
     */
    public String getNotes() {
        return notes;
    }

    /**
     * 个人说明
     * @param notes 个人说明
     */
    public void setNotes(String notes) {
        this.notes = notes == null ? null : notes.trim();
    }

    /**
     * OFFLINE：离线，ONLINE：在线，LOCK：被锁定
     * @return status OFFLINE：离线，ONLINE：在线，LOCK：被锁定
     */
    public String getStatus() {
        return status;
    }

    /**
     * OFFLINE：离线，ONLINE：在线，LOCK：被锁定
     * @param status OFFLINE：离线，ONLINE：在线，LOCK：被锁定
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * ADMIN：管理员，NORMAL：普通用户
     * @return user_type ADMIN：管理员，NORMAL：普通用户
     */
    public String getUserType() {
        return userType;
    }

    /**
     * ADMIN：管理员，NORMAL：普通用户
     * @param userType ADMIN：管理员，NORMAL：普通用户
     */
    public void setUserType(String userType) {
        this.userType = userType == null ? null : userType.trim();
    }

    /**
     * 被举报次数
     * @return report_num 被举报次数
     */
    public Integer getReportNum() {
        return reportNum;
    }

    /**
     * 被举报次数
     * @param reportNum 被举报次数
     */
    public void setReportNum(Integer reportNum) {
        this.reportNum = reportNum;
    }

    /**
     * 密码输入错误连续超过5次账户将被锁定
     * @return pwd_error_count 密码输入错误连续超过5次账户将被锁定
     */
    public Integer getPwdErrorCount() {
        return pwdErrorCount;
    }

    /**
     * 密码输入错误连续超过5次账户将被锁定
     * @param pwdErrorCount 密码输入错误连续超过5次账户将被锁定
     */
    public void setPwdErrorCount(Integer pwdErrorCount) {
        this.pwdErrorCount = pwdErrorCount;
    }

    /**
     * 记录上一次登录时间
     * @return last_time 记录上一次登录时间
     */
    public Date getLastTime() {
        return lastTime;
    }

    /**
     * 记录上一次登录时间
     * @param lastTime 记录上一次登录时间
     */
    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    /**
     * 账户被锁定后，何时解锁可使用
     * @return unlock_time 账户被锁定后，何时解锁可使用
     */
    public Date getUnlockTime() {
        return unlockTime;
    }

    /**
     * 账户被锁定后，何时解锁可使用
     * @param unlockTime 账户被锁定后，何时解锁可使用
     */
    public void setUnlockTime(Date unlockTime) {
        this.unlockTime = unlockTime;
    }
}