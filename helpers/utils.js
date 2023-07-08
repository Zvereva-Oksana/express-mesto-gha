// eslint-disable-next-line consistent-return
module.exports.isIdValidity = (id, res) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).send({ message: 'Передан несуществующий _id.' });
  }
};
