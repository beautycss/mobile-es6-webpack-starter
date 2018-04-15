/*
 * form
 */
import $, { getUrlSearchParams, request } from '../common/utils';
import api from '../common/api';
import toast from '../component/toast';

// 提交表单
const postForm = (data) => {
  const bodyData = getUrlSearchParams(data);
  const result = request(api.formUrl, {
    body: bodyData,
    method: 'POST',
  });

  result.then((json) => {
    if (json.success === true) {
      toast('提交成功！');
      // 清空表单
      $('#realname, #mobilephone').val('');
    }
    // 已经报名 && 其他错误信息
    if (json.success === false) {
      toast(json.message);
    }
  });
};

// 验证表单
const validateForm = (data) => {
  if (!data.realname || data.realname === '') {
    toast('请填写姓名');
    return false;
  }
  if (!data.mobilephone || data.mobilephone === '') {
    toast('请填写手机号');
    return false;
  }
  return true;
};

// 点击提交按钮
export default function handleSubmit(e) {
  e.preventDefault();
  const realname = $('#realname').val();
  const mobilephone = $('#mobilephone').val();

  const data = { realname, mobilephone };
  const isValidate = validateForm(data);
  if (!isValidate) {
    return false;
  }
  postForm(data);
}
