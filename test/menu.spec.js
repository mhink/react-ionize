// @flow

import React from 'react';
import { Ionize } from 'ionize';
import {
  app,
  ElectronTestUtils,
  Menu
} from 'electron';

describe.only('<menu />', function() {
  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
    app.test_makeReady();
    sinon.stub(Menu, 'setApplicationMenu');
  });

  afterEach(() => {
    Menu.setApplicationMenu.restore();
  });

  it.only('should properly mount the application menu', function(done) {
    let updatedMenu;

    Ionize.chain(
      <menu ref={ c => { updatedMenu = c; }} />,
      <menu ref={ c => { updatedMenu = c; }} />,
      () => {
        expect(Menu.setApplicationMenu).to.have.been.calledOnce;
        expect(Menu.setApplicationMenu).to.have.been.calledWith(updatedMenu);
        done();
      }
    );
  });

  it('should not mount multiple nested menus', function(done) {
    let rootMenu;
    let subMenu;

    Ionize.start(
      <menu ref={c => { rootMenu = c; }}>
        <menu ref={c => { subMenu = c; }} />,
      </menu>,
      () => {
        expect(Menu.setApplicationMenu).to.have.been.calledOnce;
        expect(Menu.setApplicationMenu).to.have.been.calledWith(rootMenu);
        done();
      }
    );
  });
});
