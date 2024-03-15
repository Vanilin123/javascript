/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
const valid = require('card-validator');
import { createPayForm } from '../assets/form';

test('Валидация номера карты пропускает корректный номер карты.', () => {
  expect(valid.number('4111111111111111').isValid).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы.', () => {
  expect(valid.number('рп.АимПРРdg:fdg44,4h?!jg').isValid).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр.', () => {
  expect(valid.number('41111').isValid).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр.', () => {
  expect(
    valid.number('411111111111111111111111111111111111111111111').isValid
  ).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами.', () => {
  expect(valid.expirationDate('333').isValid).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами.', () => {
  expect(valid.expirationDate('3').isValid).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами.', () => {
  expect(valid.expirationDate('33').isValid).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами.', () => {
  expect(valid.expirationDate('3333').isValid).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания).', () => {
  expect(valid.expirationDate('gfГрN,.').isValid).toBe(false);
});

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода', () => {
  const form = createPayForm();
  expect(form.form).toBeInstanceOf(HTMLFormElement);
  expect(form.form.querySelectorAll('input').length).toBe(4);
  expect(form.form.querySelectorAll('input')[0].placeholder).toEqual(
    'Номер карты'
  );
  expect(form.form.querySelectorAll('input')[1].placeholder).toEqual('Дата');
  expect(form.form.querySelectorAll('input')[2].placeholder).toEqual('CCV');
  expect(form.form.querySelectorAll('input')[3].placeholder).toEqual('Email');
});