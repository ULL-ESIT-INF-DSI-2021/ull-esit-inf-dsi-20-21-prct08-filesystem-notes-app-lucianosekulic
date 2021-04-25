import 'mocha';
import {expect} from 'chai';
import {Add} from '../src/add';

const test1 =  new Add("Pedro", "nota01", "Primera nota de Pedro", "azul");

describe('test de add', ()=> {
    it('test para comprobar funcion addAutor', ()=>{
        expect(test1.addAutor("Pedro")).to.be.equal(0);
    });
    it('test para comprobar funcion color', ()=>{
        expect(test1.Color("azul")).to.be.equal(0);
    });
    it('test para comprobar funcion existeNota', ()=>{
        expect(test1.existeNota("Nota01")).to.be.equal(1);
    });
});