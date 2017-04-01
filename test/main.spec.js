// @flow

import React from 'react';
import Ionize, { IonizeRenderer } from 'ionize';
import {
  app,
  ElectronTestUtils
} from 'electron';

describe('Ionize', function() {
  let createContainerSpy;
  let updateContainerSpy;

  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
    createContainerSpy = sinon.spy(IonizeRenderer, 'createContainer');
    updateContainerSpy = sinon.spy(IonizeRenderer, 'updateContainer');
  });

  afterEach(() => {
    createContainerSpy.restore();
    updateContainerSpy.restore();
  });

  describe('start()', function () {
    context('when the Electron app is ready', function() {
      it('should call isReady', function() {
        app.test_makeReady();
        Ionize.start(<app />);

        expect(createContainerSpy).to.have.been.calledOnce;
        expect(updateContainerSpy).to.have.been.calledOnce;
      });
    });

    context('before the Electron app is ready', function() {
      it('should call isReady, then register an event handler', function() {
        app.test_makeReady();
        Ionize.start(<app />);

        expect(createContainerSpy).to.have.been.calledOnce;
        expect(updateContainerSpy).to.have.been.calledOnce;
      });

      it('should never call createContainer/updateContainer if the app isn\'t ready', function() {
        Ionize.start(<app />);

        expect(createContainerSpy).to.have.been.calledOnce;
        expect(updateContainerSpy).not.to.have.been.called;
      });
    });
  });
});
