
const HTTP_OK = 200, BAD_REQUEST = 400;
const _ = require('lodash');
// UNEXPECTED_ERROR=500;
const {CONNECTION_CONFIG,DIALECTS,SCHEMAS} = require('db-connectors');

const commonController = async(app) => {

    /**
     * The followindg method will return a list of all the dialects
     *
     * @param {object} req
     * @param {object} res - The response object
     */
    app.get('/common/dialects', async (req, res) => {
        try {
            const dialectAttributes = _.keys( DIALECTS ).map( k =>{ return {label:k, value: DIALECTS[k] }; });
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(dialectAttributes);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }

    });

    /**
     * The followindg method will return the schema based on the dialect
     *
     * @param {object} req
     * @param {object} req.params
     * @param {string} req.params.dialect
     * @param {object} res - The response object
     */
    app.get('/common/schema/:dialect?', async (req, res) => {
        const dialect =  req.params.dialect;
        try {
            const schema = CONNECTION_CONFIG[dialect];
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(_.keys( schema.properties ).map (k => schema.properties[k]));
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }
    });
};

module.exports = commonController;