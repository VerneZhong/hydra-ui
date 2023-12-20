import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function query(query) {
  return request({
    url: '/system/pandora/queryList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: query
  })
}
