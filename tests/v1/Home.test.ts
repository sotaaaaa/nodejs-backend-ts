import * as chai from 'chai';

import chaiHttp = require('chai-http');
import Locals from '../../src/providers/Locals';

chai.use(chaiHttp);

let should = chai.should();
let expect = chai.expect;
let server = `http://localhost:${Locals.config().port}/${
    Locals.config().apiPrefixV1
}`;

/*
 * Test the /GET route
 */
describe('/GET Home Page', () => {
    it('It should GET home page', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
