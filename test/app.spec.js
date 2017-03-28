import React from 'react';
import { Ionize, IonizeRenderer } from 'ionize';
import {
  app as electronApp,
  ElectronTestUtils
} from 'electron';

describe('<app />', function() {
  beforeEach(() => {
    ElectronTestUtils.reset();
  });

  describe('props', function() {
    describe('onReady', function() {
      it("should be triggered when the app is first mounted", function() {
        let onReadySpy = sinon.spy();

        electronApp.test_makeReady();

        IonizeRenderer.syncUpdates(() => {
          Ionize.start(
            <app onReady={onReadySpy} />
          );
        });

        expect(onReadySpy).to.have.been.calledOnce;
      });
    });
  });
});
