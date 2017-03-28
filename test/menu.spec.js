// @flow

import React from 'react';
import { Ionize } from 'ionize';
import {
  app,
  ElectronTestUtils,
  Menu
} from 'electron';

describe.only('<menu />', function() {
  let menuStub;

  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
    app.test_makeReady();
    menuStub = sinon.stub(Menu, 'setApplicationMenu');
  });

  afterEach(() => {
    menuStub.restore();
  });

  it('should properly mount the application menu', function(done) {
    Ionize.chain(
      <menu />,
      <menu />,
      () => {
        expect(menuStub).to.have.been.calledOnce;
        done();
      }
    );
  });

  it('should not mount multiple nested menus', function(done) {
    Ionize.start(
      <menu>
        <menu />,
      </menu>,
      () => {
        expect(menuStub).to.have.been.calledOnce;
        done();
      }
    );
  });
});
