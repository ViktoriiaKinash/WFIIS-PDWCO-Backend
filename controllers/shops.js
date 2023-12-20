const driver = require('../config').driver;

exports.getShops = async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.readTransaction(txc => txc.run('MATCH (s:Shop) RETURN s'));
        const shops = result.records.map(record => record.get('s').properties);
        res.json(shops);
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};

exports.addShop = async (req, res) => {
    const { name, location, space} = req.body.params;
    const session = driver.session();
    try {
        const result = await session.writeTransaction(txc =>
            txc.run(
                'MERGE (s:Shop {name: $name}) ON CREATE SET s.location = $location, s.space = $space RETURN s',
                { name, location, space}
            )
        );
        const shop = result.records[0].get('s').properties;
        res.status(201).json(shop);
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};

exports.deleteShop = async (req, res) => {
    const shopName = req.query.name;
    const session = driver.session();
    try {
        await session.writeTransaction(txc =>
            txc.run(
                'MATCH (s:Shop {name: $shopName}) ' +
                'DETACH DELETE s',
                { shopName }
            )
        );
        res.status(200).send('Shop ${shopName} deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};