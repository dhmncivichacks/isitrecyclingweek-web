import jss from 'jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import vendorPrefixer from 'jss-vendor-prefixer';

jss.use(camelCase);
jss.use(px);
jss.use(vendorPrefixer);

export * from 'react-jss';
