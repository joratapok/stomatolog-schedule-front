import React, {PropsWithChildren} from 'react';
import dynamic from 'next/dynamic';

const NonSSRWrapper = (props: PropsWithChildren) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
