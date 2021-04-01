$(function () {
  if (!document.querySelector('#mollie-payment-form')) {
    return;
  }

  const steps = [
    // {
    //   text: 'Onboarding Assistant Designs',
    //   stepNoClass: 'step-1',
    //   classActive: 'active-step-1',
    //   btnBackClass:'d-none',
    //   btnNextText: 'Start guide',
    //   btnNextClass:'ml-auto mr-auto',
    //   attachToElement: 'body'
    // },
    // {
    //   text: 'Thank you for installing Mollie for payment services. This guide will take you through the configuration setup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nibh quis urna congue, et interdum nulla rutrum. Cras at justo ornare.',
    //   stepNoClass: 'step-2',
    //   title: '<h2>Let me help you</h2>',
    //   btnBackText:'Skip this, I know how it works',
    //   btnNextText: 'Start onboarding assistant',
    //   scrollToTarget: '#sylius_payment_method_gatewayConfig_config_api_key_test'
    // },
    {
      text: 'TEST will be the default in the plugin. You only need to do the configuration once to have TEST + LIVE environments available. Try easily togging between the two.',
      stepNoClass: ' right-bottom',
      attachToElement: '.onboardingWizard-environment',
      scrollToTarget: '.ui.dropdown.selection',
      btnBackText:'Go back',
      btnNextText: 'Next',
      btnCollapseClass: 'btn-collapse',
    },
    {
      title: 'Connect to your account',
      text: 'To sync the Mollie plugin to your webshop you\'ll hneed Mollie API keys and Profile ID.',
      stepNoClass: 'step-4',
      btnBackText:'Login to my account',
      btnNextText: 'Create a Mollie account',
      btnCollapseClass: 'btn-collapse d-none',
      urlMollie: 'https://www.mollie.com/dashboard',
    },
    {
      text: 'Fill in your correct details and click "TEST API Key" this will return a successful or failed result for both the LIVE and TEST environments.\n' +
        '\n' +
        'Learn about the difference between: Orders API or the Payments API',
      stepNoClass: 'step-5 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '[for="sylius_payment_method_gatewayConfig_config_api_key_test"] + *',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'Enabling components, allows you to add the fields needed for credit card holder data to your own\n' +
        'checkout. If you select NO, users will be redirected to the Mollie\n' +
        'checkout page',
      stepNoClass: 'step-6 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '#sylius_payment_method_gatewayConfig_config_components + label',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'Enabling single click payments remembers your consumer\'s payment preferences in order to expedite follow-up payments. Your consumer does not have to perform any additional actions to enjoy quick and easy payments.',
      stepNoClass: 'step-7 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '.onboardingWizard-singleClick',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'We\'ll go through setup with the Payments API first and then highlight differences if you choose to use the Orders API',
      stepNoClass: 'step-8 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'You can enter a custom title here - it will be displayed on your checkout page',
      stepNoClass: 'step-9 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '#sylius_payment_method_gatewayConfig_mollieGatewayConfig_1_name',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'Choose Payments API (Payments API can not be used for methods such as Klarna - we\'ll set-up that up later) Learn about the difference  between Orders APIor the Payments API',
      stepNoClass: 'step-10 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '[for="sylius_payment_method_gatewayConfig_mollieGatewayConfig_1_paymentType"] + .dropdown',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'When using Payments API you may want additional details to help you match payments with customer orders -- you can enter those values here but make sure to use the correct tags provide in the text below',
      stepNoClass: 'step-11 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'Restrict/ allow payment per individual countries.',
      stepNoClass: 'step-12 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '[for="sylius_payment_method_gatewayConfig_mollieGatewayConfig_1_country_restriction"] +' +
        ' .dropdown',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'In case you have fees that you are passing on to the consumer, you can add them here',
      stepNoClass: 'step-13 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '[for="sylius_payment_method_gatewayConfig_mollieGatewayConfig_1_paymentSurchargeFee_type"] +' +
        ' .dropdown',
      btnCollapseClass: 'btn-collapse',
    },
    {
      text: 'Upload a custom image for the payment method icon, this will be shown in the checkout page',
      stepNoClass: 'step-14 right-bottom',
      btnBackText:'Go back',
      btnNextText: 'Next',
      attachToElement: '#sylius_payment_method_gatewayConfig_mollieGatewayConfig_1_customizeMethodImage_file',
      btnCollapseClass: 'btn-collapse',
    },
    {
      title: 'You\'re all set!',
      stepNoClass: 'step-15',
      text: 'You\'re all done, you can now attempt a consumer order or your website',
      btnBackClass: 'd-none',
      btnNextClass: 'ml-auto mr-auto',
      btnNextText: 'Start using Mollie plugin',
      btnCollapseClass: 'btn-collapse d-none',
    },
  ];

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    confirmCancel: false,
    popperOptions: {
      modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
    },
    defaultStepOptions: {
      class: 'onboardingWizard-popup',
      arrow: false,
      cancelIcon: {
        enabled: true,
      },
      scrollTo: true,
    },
  });

  steps.forEach((step, index) => {
    tour.addStep({
      title: step.title ? step.title : null,
      text: step.text,
      classes: step.stepNoClass,
      ...step.advanceOn && { selector: '.btn-collapse', event: 'click' },
      attachTo: {
        ...(step.attachToElement && { element: step.attachToElement }),
        on: 'top-start'
      },
      ...(step.classActive && { highlightClass: step.classActive }),
      scrollToHandler: function () {
        const target = document.querySelector(step.attachToElement);

        if (!target) {
          return;
        }

        window.scroll({
          top: $(target).offset().top - 150,
          behavior: 'smooth',
        });
      },
      buttons: [
        {
          text: '<i class="arrow down icon"></i>',
          action() {
            const currentStep = this.currentStep.el;
            const buttonCollapse = currentStep.querySelector('.btn-collapse');
            const isCollapsed = [...currentStep.classList].includes('collapsed');

            const paragraph = document.createElement('span');
            paragraph.classList.add('btn-text-open');
            paragraph.textContent = 'Open';

            const textOpen = buttonCollapse.querySelector('.btn-text-open ')

            !isCollapsed ? buttonCollapse.appendChild(paragraph) : buttonCollapse.removeChild(textOpen)

            currentStep.classList.toggle('collapsed', !isCollapsed);
            currentStep.setAttribute('aria-hidden', !isCollapsed);
          },
          ...(step.btnCollapseClass && { classes: step.btnCollapseClass }),
        },
        {
          text: step.btnBackText,
          action() {
            if (index === 0) {
              tour.cancel();
            } else {
              if(step.urlMollie) {
                window.open(`${step.urlMollie}/signin`, '_blank');
                tour.next();
                return
              }
              tour.back();
            }
          },
          secondary: true,
          ...(step.btnBackClass && { classes: step.btnBackClass }),
        },
        {
          text: step.btnNextText,
          action() {
            if(index === steps.length - 1) {
              tour.complete();
            } else {
              if(step.urlMollie) {
                window.open(`${step.urlMollie}/signup`, '_blank');
                tour.next();
                return
              }
              tour.next();
            }
          },
          ...(step.btnNextClass && { classes: step.btnNextClass }),
        },
      ],
    });
  });


  tour.start();

  const stepsOrderApi = [
    {
      stepNoClass: 'step-1 right-bottom',
      text: 'Choose Payments API (Payments API can not be used for methods such as Klarna - we\'ll set-up that up later)\n' +
        'Learn about the difference between: Orders API or the Payments API ',
      btnBackText:'Go back',
      btnNextText: 'Next',
      // attachToElement: '.onboardingWizard-paymentType .dropdown',
    },
  ];

  const tourOrdersApi = new Shepherd.Tour({
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
  });

  stepsOrderApi.forEach((step, index) => {
    tourOrdersApi.addStep({
      title: step.title ? step.title : null,
      text: step.text,
      classes: step.stepNoClass,
      attachTo: {
        ...(step.attachToElement && { element: step.attachToElement }),
      },
      ...(step.classActive && { highlightClass: step.classActive }),
      scrollToHandler: function () {
        const target = document.querySelector(step.attachToElement);
        console.log(target);
        if (!target) {
          return;
        }

        $('html,body').animate({
          scrollTop: $(target).offset().top - 100
        }, 500);

        // window.scroll({
        //   top: $(target).offset().top - 100,
        // });

        // window.scrollTo(0, target.getBoundingClientRect().top - 200);
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
    });
  });

  document.querySelector('[data-value="ORDER_API"]').addEventListener('click', () => {
    tourOrdersApi.start();
  })

});
