import React from 'react';
import { getByPlaceholderText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

beforeEach(() => {
    render(<IletisimFormu/>);
  });

// _______________________________________________🥎_______________________________________________ //

test('hata olmadan render ediliyor', () => {
});

// _______________________________________________🥎_______________________________________________ //

test('iletişim formu headerı render ediliyor', () => {
    expect(screen.getByText(/İletişim Formu/i)).toBeInTheDocument();
});

// _______________________________________________🥎_______________________________________________ //

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    userEvent.type(screen.getByPlaceholderText(/İlhan/i), "aa");
    expect(screen.getAllByTestId("error").length).toBe(1);
});

// _______________________________________________🥎_______________________________________________ //

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    userEvent.click(screen.getByRole("button", { name: /gönder/i }));
    expect(screen.getAllByTestId("error").length).toBe(3);
});

// _______________________________________________🥎_______________________________________________ //

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    userEvent.type(screen.getByPlaceholderText(/İlhan/i), "Aytaç");
    userEvent.type(screen.getByPlaceholderText(/Mansız/i), "Şahin");
    userEvent.click(screen.getByRole("button", { name: /gönder/i }));
    expect(screen.getAllByTestId("error").length).toBe(1);
});

// _______________________________________________🥎_______________________________________________ //

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    userEvent.type(screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i), "aaa");
    expect(screen.getByText(/hata: email geçerli bir email adresi olmalıdır\./i)).toBeInTheDocument();
});

// _______________________________________________🥎_______________________________________________ //

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    userEvent.type(screen.getByPlaceholderText(/İlhan/i), "Aytaç");
    userEvent.type(screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i), "aytac@aytac.com");
    userEvent.click(screen.getByRole("button", { name: /gönder/i }));
    screen.getByText(/hata: soyad gereklidir\./i)
});

// _______________________________________________🥎_______________________________________________ //

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    userEvent.type(screen.getByPlaceholderText(/İlhan/i), "Aytaç");
    userEvent.type(screen.getByPlaceholderText(/Mansız/i), "Şahin");
    userEvent.type(screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i), "aytac@aytac.com");
    userEvent.click(screen.getByRole("button", { name: /gönder/i }));
    expect(screen.queryAllByTestId("error").length).toBe(0);
});

// _______________________________________________🥎_______________________________________________ //
test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    userEvent.type(screen.getByPlaceholderText(/İlhan/i), "Aytaç");
    userEvent.type(screen.getByPlaceholderText(/Mansız/i), "Şahin");
    userEvent.type(screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i), "aytac@aytac.com");
    userEvent.type(screen.getByText(/mesaj/i), "Tüm bilgilerimi girdim. Gerekenin yapılmasını rica ederim.");
    userEvent.click(screen.getByRole("button", { name: /gönder/i }));
    expect(screen.queryByTestId("firstnameDisplay")).toHaveTextContent("Aytaç");
    expect(screen.queryByTestId("lastnameDisplay")).toHaveTextContent("Şahin");
    expect(screen.queryByTestId("emailDisplay")).toHaveTextContent("aytac@aytac.com");
    expect(screen.queryByTestId("messageDisplay")).toHaveTextContent("Tüm bilgilerimi girdim. Gerekenin yapılmasını rica ederim.");
});

