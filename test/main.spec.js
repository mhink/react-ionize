import React from 'react';
import { Ionize, IonizeRenderer } from 'ionize';
import {
  app,
  ElectronTestUtils
} from 'electron';

describe('Ionize', function() {
  let rendererMock;

  beforeEach(() => {
    ElectronTestUtils.reset();
    rendererMock = sinon.mock(IonizeRenderer);
  });

  describe('start()', function () {
    context('when the Electron app is ready', function() {
      it('should call isReady', function() {
        rendererMock.expects('createContainer').once();
        rendererMock.expects('updateContainer').once();
        app.test_makeReady();
        Ionize.start(<app />);
        rendererMock.verify();
      });
    });

    context('before the Electron app is ready', function() {
      it('should call isReady, then register an event handler', function() {
        rendererMock.expects('createContainer').once();
        rendererMock.expects('updateContainer').once();
        app.test_makeReady();
        Ionize.start(<app />);
        rendererMock.verify();
      });

      it('should never call createContainer/updateContainer if the app isn\'t ready', function() {
        rendererMock.expects('createContainer').never();
        rendererMock.expects('updateContainer').never();
        Ionize.start(<app />);
        rendererMock.verify();
      });
    });
  });
});
