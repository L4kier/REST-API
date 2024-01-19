const assert = require('assert');
const sinon = require('sinon');
const supertest = require('supertest');
var db = require('../db');
var bcrypt = require('bcrypt')
const app = require('../app');

describe('Testowanie funkcji /login', () => {
    let request;

    before(() => {
        request = supertest(app);
    });

    it('Powinno obsłużyć poprawne logowanie', async () => {
        // Symuluj odpowiedzi bazy danych
        const dbStub = sinon.stub(db, 'all');
        dbStub.yields(null, [{ login: 'testacc', haslo: await bcrypt.hash('test', 10), czyAdmin: 1 }]);
        
        const testData = {
            login: 'testacc',
            haslo: 'test'
        };

        const res = await request.post('/login').send(testData);

        // Asercje
        console.log(res.status);
        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header['location'], '/admin');
        assert(Array.isArray(res.headers['set-cookie']));

        // Przywróć oryginalną funkcję po zakończeniu testu
        dbStub.restore();
    });

    it('Powinno obsłużyć niepoprawne logowanie i wyrenderować odpowiedni widok', async () => {
        // Symuluj odpowiedzi bazy danych dla niepoprawnych danych logowania
        const dbStub = sinon.stub(db, 'all');
        dbStub.yields(null, [{ login: 'testacc', haslo: await bcrypt.hash('test', 10), czyAdmin: 1 }]);

        const testData = {
            login: 'testacc',
            haslo: 'incorrectpassword'
        };

        const res = await request.post('/login').send(testData);

        // Asercje dla niepoprawnego logowania
        assert.strictEqual(res.status, 200);  // Oczekuj sukcesu (status 200) w przypadku renderowania widoku
        assert.strictEqual(res.text.includes('Hasło jest nieprawidłowe'), true);  // Sprawdź, czy komunikat jest w treści odpowiedzi

        dbStub.restore();
    });
});
