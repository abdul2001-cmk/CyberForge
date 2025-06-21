# Contributing to CyberForge

Thank you for your interest in contributing to CyberForge! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please treat all contributors with respect and create a welcoming environment for everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and cybersecurity concepts

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/cyberforge.git
   cd cyberforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Provide clear use cases** for the feature
- **Explain the expected behavior**
- **Consider security implications**

### Pull Requests

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add new vulnerability scanner module"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎯 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Use functional components with hooks
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add JSDoc comments for complex functions

### Component Structure

```typescript
interface ComponentProps {
  // Define props with clear types
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX with proper accessibility
  );
}
```

### Security Considerations

- **Input validation**: Always validate user inputs
- **XSS prevention**: Sanitize data before rendering
- **Authentication**: Implement proper auth checks
- **Error handling**: Don't expose sensitive information

## 🧪 Testing

### Running Tests

```bash
npm run test
```

### Writing Tests

- Write unit tests for utility functions
- Add integration tests for components
- Include security-focused test cases
- Test edge cases and error conditions

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public functions
- Include usage examples
- Document security implications
- Keep README.md updated

### Commit Messages

Follow conventional commit format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 🔒 Security Guidelines

### Responsible Disclosure

If you discover security vulnerabilities:

1. **Do not** create public issues
2. **Email** security@cyberforge.dev
3. **Provide** detailed information
4. **Allow** time for fixes before disclosure

### Security Best Practices

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Implement proper input validation
- Follow OWASP security guidelines

## 🏷️ Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes

## 📞 Getting Help

### Community Support

- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Email**: development@cyberforge.dev

### Development Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [OWASP Guidelines](https://owasp.org/)

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to CyberForge! 🛡️