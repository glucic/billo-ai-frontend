
# BilloAI

**BilloAI** is an AI-powered invoice generation platform designed to help businesses create professional, customizable invoices quickly and effortlessly. With multi-language support, smart templates, and seamless PDF export, BilloAI simplifies your billing process.

---

## Features

- **AI-Powered Invoicing**: Generate invoices instantly with AI-driven templates.
- **Customizable Templates**: Tailor your invoice design to match your brand.
- **Multi-Language Support**: Supports multiple locales with dynamic translations.
- **Multi-Currency Billing**: Bill clients worldwide with automatic currency conversion.
- **Automated Billing**: Recurring invoices and smart reminders to save time.
- **Responsive UI**: Clean, modern, and mobile-friendly design.

---

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Internationalization**: `next-intl`
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Roboto)
- **Language**: TypeScript / JavaScript
- **Version Control**: Git

---

## Getting Started

### Prerequisites

- Node.js (>=18.x)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/billoai.git
cd billoai
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_APP_URL=https://billoai.app
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
/app
  /[locale]           # Localized routes and layouts
  /components         # React components (Navbar, Hero, Features, etc.)
/i18n
  /locales            # JSON translation files
  routing.ts          # Locale routing config
  request.ts          # i18n request config
/public               # Static assets (images, icons)
/styles               # Global styles and Tailwind config
```

---

## Localization

This project uses [`next-intl`](https://next-intl-docs.vercel.app/) for handling localization. Translation files are stored as JSON in `/i18n/locales`.

Supported locales:

- English (`en`)
- German (`de`)

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---
