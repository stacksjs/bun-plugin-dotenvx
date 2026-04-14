---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "bun-plugin-dotenvx"
  text: "Seamless .env management for Bun"
  tagline: "Automatically load, decrypt, and manage your environment variables with dotenvx integration"
  image: /images/logo-white.png
  actions:
    - theme: brand
      text: Get Started
      link: /intro
    - theme: alt
      text: View on GitHub
      link: https://github.com/stacksjs/bun-plugin-dotenvx

features:
  - title: Multi-Environment Support
    icon: 🌍
    details: "Load different .env files for different environments with flexible configuration options."
  - title: Encrypted Environment Variables
    icon: 🔐
    details: "Securely store encrypted environment variables in your codebase using public-key cryptography."
  - title: Variable Expansion & Command Substitution
    icon: 🔄
    details: "Reference existing variables and include command outputs directly in your .env files."
  - title: Seamless Integration
    icon: 🚀
    details: "Works out of the box with Bun's plugin system for a frictionless developer experience."
---