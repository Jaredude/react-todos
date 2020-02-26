import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

const AccountsUIWrapper = () => {
  const container = useRef(null);

  useEffect(() => {
    Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(container.current));
  }, []);

  return <span ref={container} />;
};

export default AccountsUIWrapper;
