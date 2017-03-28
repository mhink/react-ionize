import React from 'react';
import { Ionize, IonizeRenderer } from 'ionize';
import {
  app,
  ElectronTestUtils
} from 'electron';

describe('<window />', function() {
  let windowRef;
  const captureRef = { ref: c => { windowRef = c; }}

  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
    app.test_makeReady();
  });

  describe('props', function() {
    describe('show', function() {
      context('during the initial mount', function() {
        context('when true', function() {
          it('the window should immediately become visible', function(done) {
            const win = ElectronTestUtils.getWindow(0);
            const show = sinon.stub(win, 'show');

            Ionize.start(
              <window show { ...captureRef} />,
              () => {
                expect(show).to.have.been.calledOnce;
                done();
              }
            );
          });
        });

        context('when false', function() {
          it('the window should NOT become visible', function(done) {
            const win = ElectronTestUtils.getWindow(0);
            const show = sinon.stub(win, 'show');

            Ionize.start(
              <window {...captureRef} />,
              () => {
                expect(show).not.to.have.been.called;
                done();
              }
            );
          });
        });

        context('when an updated is committed', () => {
          context('when it transitions from FALSE to TRUE', function() {
            it('should cause the window to become visible', function(done) {
              const win = ElectronTestUtils.getWindow(0);
              const show = sinon.stub(win, 'show');

              Ionize.chain(
                <window show={false} {...captureRef} />, 
                () => {
                  expect(show).not.to.have.been.called;
                },
                <window show={true} {...captureRef} />,
                () => {
                  expect(show).to.have.been.calledOnce;
                  done();
                }
              );
            })
          });

          context('when it transitions from TRUE to FALSE', function() {
            it('should cause the window to become hidden', function(done) {
              const win = ElectronTestUtils.getWindow(0);
              const show = sinon.stub(win, 'show');
              const hide = sinon.stub(win, 'hide');

              Ionize.chain(
                <window show={true} {...captureRef} />, 
                () => {
                  expect(show).to.have.been.calledOnce;
                  expect(hide).not.to.have.been.called;
                },
                <window show={false} {...captureRef} />,
                () => {
                  expect(hide).to.have.been.calledOnce;
                  done();
                }
              );
            })
          });
        });
      });
    });
  });
});
