import 'mocha';
import {expect} from 'chai';
import { Modify } from '../src/modify';

const test1 =  new Modify("Pedro", "Nota01", "Pedro ha modificado la nota :)", "azul");

describe('test de modify', ()=> {
    it('test para comprobar existeNota de la clase modify', ()=>{
        expect(test1.existeNota("Nota01")).to.be.equal(1);
    });
});