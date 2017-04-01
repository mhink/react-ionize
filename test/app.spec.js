// @flow

import React from 'react';
import Ionize from 'ionize';
import {
  app as electronApp,
  ElectronTestUtils
} from 'electron';

describe('<app />', function() {
  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
  });

  describe('props', function() {
    describe('onReady', function() {
      it("should be triggered when the app is first mounted", function(done) {
        let onReadySpy = sinon.spy();

        electronApp.test_makeReady();

        Ionize.start(
          <app onReady={onReadySpy} />,
          () => {
            expect(onReadySpy).to.have.been.calledOnce;
            done();
          }
        );
      });
    });
  });
});
