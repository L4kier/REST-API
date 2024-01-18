# Dokumentacja API

## 1. Logowanie

### 1.1 Generowanie widoku logowania

- **Metoda:** GET
- **Endpoint:** `/login`
- **Opis:** Generuje widok logowania.

### 1.2 Przesyłanie danych logowania

- **Metoda:** POST
- **Endpoint:** `/login`
- **Opis:** Przesyła dane logowania w celu autentykacji.
- **Parametry:**
  - `login` (string) - Nazwa użytkownika
  - `haslo` (string) - Hasło użytkownika
- **Nagłówki:**
  - `Content-Type: application/json`
- **Uwagi:** Dane są przesyłane w ciele żądania (body) w formacie JSON.

## 2. Panel Administratora

### 2.1 Renderowanie widoku panelu administratora

- **Metoda:** GET
- **Endpoint:** `/admin`
- **Opis:** Renderuje widok panelu administratora.

### 2.2 Wylogowywanie użytkownika

- **Metoda:** GET
- **Endpoint:** `/admin/logout`
- **Opis:** Wylogowuje użytkownika i usuwa sesję cookie.
- **Nagłówki:**
  - `Content-Type: application/json`

### 2.3 Dodawanie nowego użytkownika

- **Metoda:** GET
- **Endpoint:** `/admin/adduser`
- **Opis:** Generuje widok do dodawania nowego użytkownika.

- **Metoda:** POST
- **Endpoint:** `/admin/adduser`
- **Opis:** Dodaje nowego użytkownika do systemu.
- **Parametry:**
  - `imie` (string) - Imię użytkownika
  - `nazwisko` (string) - Nazwisko użytkownika
  - `login` (string) - Nazwa użytkownika
  - `haslo` (string) - Hasło użytkownika
  - `email` (string) - Adres e-mail użytkownika
  - `telefon` (string) - Numer telefonu użytkownika
  - `czyAdmin` (number) - Flaga określająca czy użytkownik ma uprawnienia administratora (0 - brak, 1 - tak).
- **Nagłówki:**
  - `Content-Type: application/json`
- **Uwagi:** Dane są przesyłane w ciele żądania (body) w formacie JSON.

## 3. Filmy

### 3.1 Renderowanie widoku z listą filmów

- **Metoda:** GET
- **Endpoint:** `/movies`
- **Opis:** Renderuje widok z listą filmów.

### 3.2 Renderowanie widoku dodawania filmu

- **Metoda:** GET
- **Endpoint:** `/movies/add`
- **Opis:** Renderuje widok z formularzem do dodawania nowego filmu.

### 3.3 Dodawanie nowego filmu

- **Metoda:** POST
- **Endpoint:** `/movies/add`
- **Opis:** Dodaje nowy film do bazy danych.
- **Parametry:**
  - `tytul` (string) - Tytuł filmu
  - `rezyser` (string) - Nazwisko reżysera filmowego
  - `srednia_ocena` (number) - Średnia ocena filmu
  - `gatunek` (string) - Gatunek filmu
- **Nagłówki:**
  - `Content-Type: application/json`
- **Uwagi:** Dane są przesyłane w ciele żądania (body) w formacie JSON.

### 3.4 Renderowanie widoku edycji filmu

- **Metoda:** GET
- **Endpoint:** `/movies/edit/:id`
- **Opis:** Renderuje widok z formularzem do edycji filmu o określonym ID.

### 3.5 Edycja filmu

- **Metoda:** POST
- **Endpoint:** `/movies/edit/:id`
- **Opis:** Edytuje film o określonym ID w bazie danych.
- **Parametry:**
  - `tytul` (string) - Tytuł filmu
  - `rezyser` (string) - Nazwisko reżysera filmowego
  - `srednia_ocena` (number) - Średnia ocena filmu
  - `gatunek` (string) - Gatunek filmu
  - `id` (number) - ID filmu do edycji
- **Nagłówki:**
  - `Content-Type: application/json`
- **Uwagi:** Dane są przesyłane w ciele żądania (body) w formacie JSON.

### 3.6 Usuwanie filmu

- **Metoda:** DELETE
- **Endpoint:** `/movies/delete/:id`
- **Opis:** Usuwa film z bazy danych o określonym ID.
- **Nagłówki:**
  - `Content-Type: application/json`