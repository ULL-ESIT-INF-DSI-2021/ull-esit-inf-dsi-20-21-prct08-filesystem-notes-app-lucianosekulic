import 'mocha';
import {expect} from 'chai';
import { Read } from '../src/read';

const test1=  new Read("Pedro", "Nota01");

describe('test de read', ()=> {
    it('test para comprobar existeNota de la clase read', ()=>{
        expect(test1.existeNota("Nota01")).to.be.equal(1);
    });
});