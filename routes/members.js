import express from 'express';
const router = express.Router();
let members = [
  {
    name: '成飞',
    status: '可用',
    selected: true,
  },
  {
    name: '成伟',
    status: '不可用',
  },
  {
    name: '成领',
    status: '可用',
    selected: true,
  },
  {
    name: '成燕',
    status: '可用',
  },
  {
    name: '成二头',
    status: '可用',
  },
  {
    name: '周宏儿',
    status: '可用',
  },
  {
    name: '成姐',
    status: '可用',
  },
];
/**
 * get members
 */
router.post('/',function (req, res, next) {
    let params = req.body;
    console.log(params.page);
      res.status(200).json({
          items: members,
          total_count: members.length
      })
})
module.exports = router;