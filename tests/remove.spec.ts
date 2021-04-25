import 'mocha';
import {expect} from 'chai';
import { Remove } from '../src/remove';

const test1 =  new Remove("Pedro", "Nota01");

describe('test de remove', ()=> {

    it('Test para comprobar la funcion existeNota de la clase remove', ()=>{
        expect(test1.existeNota("Nota01")).to.be.equal(0);
    });
});