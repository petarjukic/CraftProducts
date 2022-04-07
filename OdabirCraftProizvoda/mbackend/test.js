import assert from 'assert';
import mongoose from 'mongoose';
import { Manafacturer } from './models/ManafacturerModel.js';

describe('Nesting records', function() {

    if('Creates an proizvodac', function(done) {
        var pat = new Manafacturer({
            name: "Medvedgrad",
            establishmentYear: 1994,
            country: "Hrvatska",
            description: "neki tekst",
            logo: "http://www.pivovara-medvedgrad.hr/wp-content/uploads/2019/04/logo-25-1-1.png",
            product: [{
                price: 14,
                alcoholPercentage: 5.0,
                color: "svijetlo",
                type: "IBU 45"
            }]
        })
    });

    pat.save().then(function() {
        findOne({name:"Medvedgrad"}).then(function(record) {
            assert(record.product.length === 1)
            done()
        })
    })
});