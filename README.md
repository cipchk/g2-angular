# g2-angular
Angular for Alipay [G2](https://antv.alipay.com/)

[![NPM version](https://img.shields.io/npm/v/g2-angular.svg)](https://www.npmjs.com/package/g2-angular)
[![Build Status](https://travis-ci.org/cipchk/g2-angular.svg?branch=master)](https://travis-ci.org/cipchk/g2-angular)

## Demo

- [Live Demo](https://cipchk.github.io/g2-angular/)
- [Stackblitz](https://stackblitz.com/edit/g2-angular)

## Install

### 1. You can install `g2-angular` from npm.

```bash
npm install g2-angular --save
```

### 2. **Important:** You need install and include `g2` library in app via `webpack bundler` or `html`.

**A: webpack bundler**

```bash
npm install g2 --save
```

You can choose load `g2` script file via `angular.json` or Lazy load.

*(Recommend)*
```json
// angular.json
"scripts": [
  "../node_modules/g2/index.js"
]
```

or

```typescript
import { G2ChartModule } from 'g2-angular';

@NgModule({
  imports: [
    G2ChartModule.forRoot({
      js: 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.4.1/dist/g2.min.js'
    })
  ]
});
```

**B: index.html**

```html
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.4.1/dist/g2.min.js"></script>
```

## How to use it with:

+ `angular-cli` please refer to [demo](./demo/src/app/).
+ `Stackblitz` sample available [here](https://stackblitz.com/edit/g2-angular).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/g2-angular/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/g2-angular/blob/master/LICENSE) file for the full text)
