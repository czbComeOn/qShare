package edu.gmxx.share.utils;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

/**
 * Created by BIN on 2017/3/24.
 */
public class ProtraitFile {
    private CommonsMultipartFile file;

    private String avatarData;

    public CommonsMultipartFile getFile() {
        return file;
    }

    public void setFile(CommonsMultipartFile file) {
        this.file = file;
    }

    public String getAvatarData() {
        return avatarData;
    }

    public void setAvatarData(String avatarData) {
        this.avatarData = avatarData;
    }
}
