import React, { ReactElement } from 'react';

import Navbar from '@/components/header/NavBar';

function Header(): ReactElement {
  return (
    <header className="h-20">
      <Navbar />
    </header>
  );
}

export default Header;
