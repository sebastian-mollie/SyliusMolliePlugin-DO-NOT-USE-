$(function () {
  const steps = [
    {
      title: '<h2>Let me help you</h2>',
      text: 'Thank you for installing Mollie for payment services. This guide will take you through the configuration setup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nibh quis urna congue, et interdum nulla rutrum. Cras at justo ornare.',
      btnBackText:'Skip this',
      btnNextText: 'Start guide',
    },
    {
      attachToElement: '.ui.dropdown.selection',
      text: 'TEST will be the default in the plugin. You only need to do the configuration once to have TEST + LIVE environments available. Try easily togging between the two.',
      btnBackText:'Go back',
      btnNextText: 'Next',
    },
    {
      title: '<h2>Connect to your account</h2>',
      text: 'To sync the Mollie plugin to your webshop you\'ll hneed Mollie API keys and Profile ID.',
      btnBackText:'Login to my account',
      btnNextText: 'Create a Mollie account',
    },
    {
      attachToElement: '[for="sylius_payment_method_gatewayConfig_config_api_key_test"] + *',
      text: 'Fill in your correct details and click "TEST API Key" this will return a successful or failed result for both the LIVE and TEST environments.\n' +
        '\n' +
        'Learn about the difference between: Orders API or the Payments API',
      btnBackText:'Go back',
      btnNextText: 'Next',
    },
    {
      text: 'Enabling components, allows you to add the fields needed for credit card holder data to your own\n' +
        'checkout. If you select NO, users will be redirected to the Mollie\n' +
        'checkout page',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '[for="sylius_payment_method_gatewayConfig_config_components"]'
    },
    {
      title: '<h2>Let me help you</h2>',
      text: '',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: {}
    },
  ];

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
      id: 'wrapper',
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
      cancelIcon: {
        enabled: true
      },
      classes: 'modal-onboarding',
      scrollTo: {
        behavior: 'smooth',
      }
    }
  });

  steps.forEach((step, index) => {
    console.log(step.attachToElement);
    tour.addStep({
      title: step.title ? step.title : null,
      text: step.text,
      attachTo: {
        ...(step.attachToElement && { element: step.attachToElement }),
        ...(step.attachToElement && { on: 'bottom' }),
      },
      buttons: [
        {
          text: step.btnBackText,
          action: tour.back,
          secondary: true
        },
        {
          text: step.btnNextText,
          action: index === steps.length - 1 ? tour.complete : tour.next,
          // classes: 'btn btn__dc--light',
        },
      ],
    });
  });

  tour.start();
});
