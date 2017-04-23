/**
 * Created by BIN on 2017/4/11.
 */
define(['utils/messager', 'utils/common', 'qshare/footable.all.min', 'jquery/jquery.Paginator.min', 'bootstrap'],
    function($messager, comm){
    var inform = {};

    /**
     * 创建表格
     * @param auditStatus 默认审核状态
     * @returns {*|jQuery|HTMLElement}
     */
    inform.createTable = function(auditStatus){
        var that = this;
        var $table  = $('<div class="col-sm-12">' +
            '<div class="ibox float-e-margins">' +
                '<div class="ibox-title">' +
                    '<h5>举报信息列表 <span class="data-count"></span></h5>' +
                    '<div class="ibox-tools">' +
                        '<select class="form-control" id="auditStatusSelect" ' +
                            'style="padding:0; height:22px; font-size:10px;">' +
                            '<option value="ALL">全部</option>' +
                            '<option value="NOTAUDIT">待审核</option>' +
                            '<option value="LOCK">已处理</option>' +
                            '<option value="NORMAL">正常</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="ibox-content">' +
                    '<table class="footable table table-stripped toggle-arrow-tiny" style="margin-bottom:0;">' +
                        '<thead>' +
                            '<tr>' +
                                '<th data-toggle="true">序号</th>' +
                                '<th>被举报用户</th>' +
                                '<th>举报用户</th>' +
                                '<th>举报时间</th>' +
                                '<th>状态</th>' +
                                '<th data-hide="all">举报内容</th>' +
                                '<th data-hide="all">审核人</th>' +
                                '<th data-hide="all">审核时间</th>' +
                                '<th data-hide="all">审核备注</th>' +
                                '<th>操作</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody></tbody>' +
                    '</table>' +
                '</div>' +
            '</div>' +
        '</div>');

        var statusSelect = $table.find('#auditStatusSelect');
        statusSelect.find('option').each(function(){
            if($(this).val() == auditStatus){
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        statusSelect.on('change', function(){
            that.loadData(1, $(this).val());
        });

        return $table;
    }

    /**
     * 加载分页信息
     * @param page
     * @param auditStatus
     */
    inform.loadpage = function(page, auditStatus){
        var that = this;
        $('#informTable').footable();
        $.jqPaginator('#pagination', {
            totalPages: parseInt(page.totalPages ? page.totalPages : 1),
            visiblePages: 10, // 最多可以显示的页码数
            currentPage: page.pageNumber ? page.pageNumber : 1,
            first: '<li class="first"><a href="javascript:void(0);" title="首页"><i class="fa fa-angle-double-left"></i></a></li>',
            prev: '<li class="prev"><a href="javascript:void(0);" title="上一页"><i class="fa fa-angle-left"></i></a></li>',
            next: '<li class="next"><a href="javascript:void(0);" title="下一页"><i class="fa fa-angle-right"></i></a></li>',
            last: '<li class="last"><a href="javascript:void(0);" title="末页"><i class="fa fa-angle-double-right"></i></a></li>',
            page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
            onPageChange: function (num, type) {
                if (type == "change") {
                    that.loadData(num, auditStatus);
                }
            }
        });
    }

    /**
     * 加载数据
     * @param num
     * @param auditStatus 审核状态
     */
    inform.loadData = function(num, auditStatus){
        var that = this;
        if(!auditStatus){
            auditStatus = 'ALL';
        }
        $.ajax({
            url: 'manage/getInformDataByStatus.do',
            data: {'pageNumber': num, 'pageSize': $('#PageSize').val(), 'auditStatus':auditStatus},
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    var $table = that.createTable(result.auditStatus);
                    var box = $('#informDataBox').empty().append($table);

                    $table.find('.data-count').text('(' + result.page.totalRecord + ')');
                    for(var i = 0; i < result.informVos.length; i++){
                        var num = (result.page.pageNumber - 1) * result.page.pageSize + i + 1;
                        box.find('tbody').append(that.getInformItem(result.informVos[i], num));
                    }
                    box.find('.footable').footable({'sort':false});
                    if(result.page.totalPages == 0 || result.page.totalCounts == 0){
                        result.page.totalPages = 1;
                        result.page.totalCounts = 1;
                        box.find('tbody').append($('<tr><td colspan="6" style="text-align: center;">没有举报信息</td></tr>'));
                    }
                    // 加载分页
                    that.loadpage(result.page, result.auditStatus);
                } else if(result.msg == 'OFFLINE'){
                    location.href = 'redirectIndex.do';
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });
    }

    /**
     * 包装举报信息
     * @param inform
     * @returns {*|jQuery|HTMLElement}
     */
    inform.getInformItem = function(informVo, number){
        var that = this;
        var $item = $('<tr></tr>');
        $('<td class="audit audit-number"></td>').text(number).appendTo($item);

        // 被举报者
        var buserPortrait = informVo.buser.portraitPath ? informVo.buser.portraitPath : 'resources/img/portrait.jpg';
        $('<td class="audit audit-buser"></td>')
            .append($('<img class="audit-user-portrait"/>').attr({'src':buserPortrait}))
            .append($('<a href="myHome.do?account=' + informVo.buser.account + '" target="_blank"></a>')
            .text(informVo.buser.nickname)).appendTo($item);

        // 举报者
        var auserPortrait = informVo.auser.portraitPath ? informVo.auser.portraitPath : 'resources/img/portrait.jpg';
        $('<td class="audit audit-auser"></td>').append($('<img class="audit-user-portrait"/>').attr({'src':auserPortrait}))
            .append($('<a href="myHome.do?account=' + informVo.auser.account + '" target="_blank"></a>')
            .text(informVo.auser.nickname)).appendTo($item);
        $('<td class="audit inform-time"></td>').text(comm.getTime(informVo.inform.createTime)).appendTo($item);
        $('<td class="audit audit-status"></td>').text(informVo.inform.auditStatus == 'NORMAL' ? '正常' :
            informVo.inform.auditStatus == 'LOCK' ? '已处理' : '待审核').appendTo($item);
        $('<td class="audit audit-content"></td>').text(informVo.inform.informContent).appendTo($item);
        $('<td class="audit audit-user"></td>').append($('<a target="_blank"></a>').attr({'href': informVo.auditUser ? informVo.auditUser.account : '#'})
            .text(informVo.auditUser ? informVo.auditUser.nickname : '')).appendTo($item);
        $('<td class="audit audit-time"></td>').text(comm.getTime(informVo.inform.auditTime)).appendTo($item);
        $('<td class="audit audit-remark"></td>').text(informVo.inform.auditRemark).appendTo($item);

        // 审核操作
        if(informVo.inform.auditStatus == 'NORMAL'){
            $('<td class="audit-opr"></td>').append($('<a class="text-navy" style="text-decoration:none;"><i class="fa fa-check text-navy"></i>通过</a>')).appendTo($item);
        } else if(informVo.inform.auditStatus == 'LOCK'){
            $('<td class="audit-opr"></td>').append($('<a class="text-navy" style="text-decoration:none;"><i class="fa fa-check text-navy"></i>已处理</a>')).appendTo($item);
        } else{
            $('<td class="audit-opr"></td>').append($('<a style="text-decoration:none;" title="审核该举报信息">审核</a>').on('click', function(){
                $(this).attr('id', informVo.inform.informId);
                new AuditDialog(that, $(this), $item, informVo);
            })).appendTo($item);
        }

        return $item;
    }

    inform.init = function(){
        this.loadData(1);
    }

    // 弹窗
    var AuditDialog = function(instance, target, item, informVo){
        this.instance = instance;
        this.target = target;
        this.item = item;
        this.informVo = informVo;
        this.init();
    }

    AuditDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: '审核举报信息',
                saveBtn: false,
                closeBtn: false,
                mode: that.paintComponent()
            }
            this.target.openModalDialog(option);
        },
        paintComponent: function(){
            var that = this;
            var $html = $('<div>' +
                '<div class="radio-inline">' +
                    '<label><input name="auditStatus" checked value="NORMAL" type="radio">正常通过</label>' +
                '</div>' +
                '<div class="radio-inline">' +
                    '<label><input name="auditStatus" value="LOCK" type="radio">已处理用户</label>' +
                '</div>' +
                '<div class="form-group">' +
                    '<textarea class="form-control" id="auditRemark" rows="3" style="resize:none;" placeholder="请填写备注"></textarea>' +
                '</div>' +
                '<div class="form-group" style="text-align: right;">' +
                    '<button class="btn btn-primary mrg-r-20" id="okBtn">确定</button>' +
                    '<button class="btn btn-primary" id="cancelBtn">取消</button>' +
                '</div>' +
            '</div>');

            this.$auditRemark = $html.find('#auditRemark');
            $html.find('#okBtn').on('click', function(){
                if(!that.$auditRemark.val()){
                    $messager.warning('请填写审核备注');
                    return false;
                }
                $.ajax({
                    url: 'manage/auditUser.do',
                    type: 'post',
                    data: {'informId': that.informVo.inform.informId, 'auditRemark': that.$auditRemark.val(),
                        'auditStatus': $html.find('input:checked').val()},
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $messager.success('审核成功');
                            that.target.closeDialog();
                            // 更新表格数据
                            that.changeItem(result.informVo);
                            // setTimeout(function(){
                            //     location.reload();
                            // }, 1000);
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            location.href = 'index.do';
                        } else{
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        $messager.warning('服务器出错');
                    }
                });
            });
            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
            });

            return $html;
        },
        changeItem: function(informVo){
            // 判断该项是否打开过
            this.item.find('.audit-status').text(informVo.inform.auditStatus == 'NORMAL' ? '正常' :
                informVo.inform.auditStatus == 'LOCK' ? '已处理' : '待审核');

            if(informVo.inform.auditStatus == 'NORMAL'){
                this.item.find('.audit-opr').empty().append($('<a class="text-navy" style="text-decoration:none;"><i class="fa fa-check text-navy"></i>通过</a>'));
            } else if(informVo.inform.auditStatus == 'LOCK'){
                this.item.find('.audit-opr').empty().append($('<a class="text-navy" style="text-decoration:none;"><i class="fa fa-check text-navy"></i>已处理</a>'));
            }
            if(!this.item.hasClass('footable-detail-show')){
                this.item.find('.audit-remark').text(informVo.inform.auditRemark);
                this.item.find('.audit-time').text(comm.getTime(informVo.inform.auditTime));
                this.item.find('.audit-user').empty().append($('<a target="_blank"></a>').attr({'href': informVo.auditUser ? informVo.auditUser.account : '#'})
                    .text(informVo.auditUser ? informVo.auditUser.nickname : ''));
            } else{
                var detailBox = this.item.next('.footable-row-detail');
                // 审核人
                detailBox.find('.footable-row-detail-row:eq(1)').find('.footable-row-detail-value').empty().append($('<a target="_blank"></a>').attr({'href': informVo.auditUser ? informVo.auditUser.account : '#'})
                    .text(informVo.auditUser ? informVo.auditUser.nickname : ''));
                // 审核时间
                detailBox.find('.footable-row-detail-row:eq(2)').find('.footable-row-detail-value').text(comm.getTime(informVo.inform.auditTime));
                // 审核备注
                detailBox.find('.footable-row-detail-row:eq(3)').find('.footable-row-detail-value').text(informVo.inform.auditRemark);
            }
        }
    }

    return inform;
})