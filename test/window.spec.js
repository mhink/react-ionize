// @flow

import React from 'react';
import Ionize, { IonizeRenderer } from 'react-ionize';
import {
  app,
  ElectronTestUtils
} from 'electron';

describe('<window />', function() {
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
            let show;
            ElectronTestUtils.onNewWindow((window) => {
              show = sinon.stub(window, 'show');
            });

            Ionize.start(
              <window show />,
              () => {
                expect(show).to.have.been.calledOnce;
                done();
              }
            );
          });
        });

        context('when false', function() {
          it('the window should NOT become visible', function(done) {
            let show;
            ElectronTestUtils.onNewWindow((window) => {
              show = sinon.stub(window, 'show');
            });

            Ionize.start(
              <window />,
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
              let show;
              ElectronTestUtils.onNewWindow((window) => {
                show = sinon.stub(window, 'show');
              });

              Ionize.chain(
                <window show={false} />, 
                () => {
                  expect(show).not.to.have.been.called;
                },
                <window show={true} />,
                () => {
                  expect(show).to.have.been.calledOnce;
                  done();
                }
              );
            })
          });

          context('when it transitions from TRUE to FALSE', function() {
            it('should cause the window to become hidden', function(done) {
              let show;
              let hide;
              ElectronTestUtils.onNewWindow((window) => {
                show = sinon.stub(window, 'show');
                hide = sinon.stub(window, 'hide');
              });

              Ionize.chain(
                <window show={true} />, 
                () => {
                  expect(show).to.have.been.calledOnce;
                  expect(hide).not.to.have.been.called;
                },
                <window show={false} />,
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

    describe('acceptFirstMouse', function() {
      context('during the initial mount', function() {
        context('when true', function () {
          it('the window should get acceptFirstMouse=true passed in the options', function (done) {
            let testWindow;
            ElectronTestUtils.onNewWindow((window) => {
              testWindow = window;
            });

            Ionize.start(
              <window acceptFirstMouse />,
              () => {
                expect(testWindow.options.acceptFirstMouse).to.be.true;
                done();
              }
            );
          });
        });

        context('when false', function () {
          it('the window should get acceptFirstMouse=false passed in the options', function (done) {
            let testWindow;
            ElectronTestUtils.onNewWindow((window) => {
              testWindow = window;
            });

            Ionize.start(
              <window />,
              () => {
                expect(testWindow.options.acceptFirstMouse).to.be.false;
                done();
              }
            );
          });
        });
      });

      context('when an updated is committed', () => {
        context('when it transitions from FALSE to TRUE', function() {
          it('should warn the user that this is not a valid operation', function(done) {
            const warn = sinon.stub(console, 'warn');

            Ionize.chain(
              <window />,
              () => {
                expect(warn).not.to.have.been.called;
              },
              <window acceptFirstMouse />,
              () => {
                expect(warn).to.have.been.calledOnce;
                console.warn.restore();
                done();
              }
            );
          })
        });

        context('when it transitions from TRUE to FALSE', function() {
          it('should warn the user that this is not a valid operation', function(done) {
            const warn = sinon.stub(console, 'warn');

            Ionize.chain(
              <window acceptFirstMouse />,
              () => {
                expect(warn).not.to.have.been.called;
              },
              <window />,
              () => {
                expect(warn).to.have.been.calledOnce;
                console.warn.restore();
                done();
              }
            );
          })
        });
      });
    });
  });
});
