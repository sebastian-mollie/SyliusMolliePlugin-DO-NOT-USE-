$(function () {
  const container = document.querySelector('[name=sylius_payment_method]');

  if (!container) {
    return;
  }

  const steps = [
    // {
    //   stepNoClass: 'step-1',
    //   classActive: 'active',
    //   text: 'Onboarding Assistant Designs',
    //   btnBackText:'Skip this',
    //   btnBackClass:'d-none',
    //   btnNextText: 'Start guide',
    //   btnNextClass:'ml-auto mr-auto',
    //   attachToElement: 'body'
    // },
    {
      stepNoClass: 'step-2',
      title: '<h2>Let me help you</h2>',
      text: 'Thank you for installing Mollie for payment services. This guide will take you through the configuration setup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nibh quis urna congue, et interdum nulla rutrum. Cras at justo ornare.',
      btnBackText:'Skip this',
      btnNextText: 'Start guide',
      scrollToTarget: '#sylius_payment_method_gatewayConfig_config_api_key_test'
    },
    {
      stepNoClass: 'step-3 modal-onboarding',
      attachToElement: '.ui.dropdown.selection',
      scrollToTarget: '.ui.dropdown.selection',
      text: 'TEST will be the default in the plugin. You only need to do the configuration once to have TEST + LIVE environments available. Try easily togging between the two.',
      btnBackText:'Go back',
      btnNextText: 'Next',
    },
    {
      stepNoClass: 'step-4',
      title: '<h2>Connect to your account</h2>',
      text: 'To sync the Mollie plugin to your webshop you\'ll hneed Mollie API keys and Profile ID.',
      btnBackText:'Login to my account',
      btnNextText: 'Create a Mollie account',
    },
    {
      stepNoClass: 'step-5 modal-onboarding',
      attachToElement: '[for="sylius_payment_method_gatewayConfig_config_api_key_test"] + *',
      text: 'Fill in your correct details and click "TEST API Key" this will return a successful or failed result for both the LIVE and TEST environments.\n' +
        '\n' +
        'Learn about the difference between: Orders API or the Payments API',
      btnBackText:'Go back',
      btnNextText: 'Next',
    },
    {
      stepNoClass: 'step-6 modal-onboarding',
      text: 'Enabling components, allows you to add the fields needed for credit card holder data to your own\n' +
        'checkout. If you select NO, users will be redirected to the Mollie\n' +
        'checkout page',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '.mollie-components',
    },
    {
      stepNoClass: 'step-7',
      title: '<h2>Let me help you</h2>',
      text: '',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: {}
    },
  ];

  function close() {

  }

  const stepss = [
    {
      title: '<h2>Let me help you</h2>',
      text: 'Thank you for installing Mollie for payment services. This guide will take you through the configuration setup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nibh quis urna congue, et interdum nulla rutrum. Cras at justo ornare.',
      buttons: [
        {
          action: function() {
            return this.cancel();
          },
          secondary: true,
          text: 'Skip this, I know how it works'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Start onboarding assistant'
        }
      ],
      when: {
        show() {
          // const currentStepElement = this.el;
          // const header = currentStepElement.querySelector('.shepherd-header');
          // const progress = document.createElement('span');
          // progress.style['margin-right'] = '315px';
          // progress.innerText = `${this.tour.steps.indexOf(this.el) + 1}/${this.tour.steps.length}`;
          // header.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));
        }
      },
    },
    {
      text: 'TEST will be the default in the plugin.<br/>' +
        'You only need to do the configuration once to have TEST + LIVE anvironments available. Try easily' +
        ' toggling between the two.',
      attachTo: {
        element: '.ui.dropdown.selection',
        on: 'bottom'
      },
      buttons: [
        {
          action: function() {
            return this.cancel();
          },
          secondary: true,
          text: 'Back'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'wrapper',
      when: {
        show() {
          // console.log(this.tour.isActive());
          // const currentStepElement = this.el;
          // const header = currentStepElement.querySelector('.shepherd-header');
          // const progress = document.createElement('span');
          // progress.style['margin-right'] = '315px';
          // progress.innerText = `${this.tour.steps.indexOf(this.el) + 1}/${this.tour.steps.length}`;
          // header.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));
        }
      },
    },
    {
      title: 'Connect your account',
      text: '<h2>Connect your Mollie account</h2>To sync the Mollie plugin to your webshop you\'ll need Mollie API' +
        ' keys and Profile ID',
      buttons: [
        {
          action: function() {
            return this.cancel();
          },
          secondary: true,
          text: 'Create a mollie account'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Login to my account'
        }
      ],
      id: 'wrapper'
    },
    {
      text: 'Copy and paste the API Key test from your Mollie account page.',
      attachTo: {
        element: '[for="sylius_payment_method_gatewayConfig_config_api_key_test"] + *',
        on: 'bottom'
      },
      buttons: [
        {
          action: function() {
            return this.cancel();
          },
          secondary: true,
          text: 'Go back'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'wrapper'
    },
    {
      text: 'Fill in your correct details and click "TEST API Keys" this will return a successfull or failed' +
        ' result for both the LIVE and TEST environments.',
      attachTo: {
        element: '.test-api-key-button',
        on: 'bottom'
      },
      buttons: [
        {
          action: function() {
            return this.cancel();
          },
          secondary: true,
          text: 'Go back'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'wrapper'
    },
    {
      text: 'Webshop checkout Configurations, Lorem Rapidiously revolutionize effective channels rather than real-time niche markets. Continually embrace team driven customer service.',
      buttons: [
        {
          action: function() {
            return this.cancel();
          },
          secondary: true,
          text: 'Go back'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'wrapper'
    },
  ];

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      arrow: false,
      cancelIcon: {
        enabled: true,
      },
      scrollTo: {
        behavior: 'smooth',
      }
    },
    id: 'wrapper',
  });

  steps.forEach((step, index) => {
    tour.addStep({
      title: step.title ? step.title : null,
      text: step.text,
      classes: step.stepNoClass,
      attachTo: {
        ...(step.attachToElement && { element: step.attachToElement }),
      },
      ...(step.classActive && { highlightClass: step.classActive }),
      scrollToHandler: function () {
        const target = document.querySelector(step.scrollToTarget);
        console.log(target.getBoundingClientRect().top);
        window.scrollTo(0, target.getBoundingClientRect().top - 200);
      },
      buttons: [
        {
          text: step.btnBackText,
          action: index === 0 ? tour.cancel : tour.back,
          secondary: true,
          ...(step.btnBackClass && { classes: step.btnBackClass }),
        },
        {
          text: step.btnNextText,
          action: index === steps.length - 1 ? tour.complete : tour.next,
          ...(step.btnNextClass && { classes: step.btnNextClass }),
        },
      ],
      ...(step.when && { when: step.when })
    });
  });

  tour.start();
});
