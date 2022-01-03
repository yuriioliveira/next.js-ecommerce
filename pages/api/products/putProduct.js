import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.body._id);
  product.promoPrice = req.body.promoPrice;
  product.descricaoTitulo = req.body.descricaoTitulo;
  product.descricaoConteudo = req.body.descricaoConteudo;
  product.especificacaoTitulo = req.body.especificacaoTitulo;
  product.especificacaoConteudo = req.body.especificacaoConteudo;
  await product.save();
  await db.disconnect();

  res.send({
    _id: product._id,
    name: product.name,
    price: product.price,
    promoPrice: product.promoPrice,
    descricoes: product.descricoes,
    descricaoTitulo: product.descricaoTitulo,
    descricaoConteudo: product.descricaoConteudo,
    especificacaoTitulo: product.especificacaoTitulo,
    especificacaoConteudo: product.especificacaoConteudo,
  });
});

export default handler;
