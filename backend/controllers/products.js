const driver = require('../config').driver;

exports.getProducts = async (req, res) => {
    const session = driver.session();
    console.log('here')
    try {
        const result = await session.readTransaction(txc => txc.run('MATCH (n:Product) RETURN n'));
        const products = result.records.map(record => record.get('n').properties);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};

exports.addProduct = async (req, res) => {
    const { name, brand, price } =  req.body.params;
    const session = driver.session();
    try {
        const result = await session.writeTransaction(txc =>
            txc.run(
                'MERGE (p:Product {name: $name}) ' +
                'ON CREATE SET p.name = $name, p.brand = $brand, p.price = $price ' +
                'RETURN p',
                { name, brand, price }
            )
        );
        const product = result.records[0].get('p').properties;
        res.status(201).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};

exports.deleteProduct = async (req, res) => {
    const productName = req.query.name;
    const session = driver.session();
    try {
        await session.writeTransaction(txc =>
            txc.run(
                'MATCH (p:Product {name: $productName}) ' +
                'DETACH DELETE p',
                { productName }
            )
        );
        res.status(200).send('Product ${productName} deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};