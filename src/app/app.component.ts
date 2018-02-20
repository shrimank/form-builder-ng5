import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fields = [
    {
      type: 'autocomplete',
      label: 'Custom Autocomplete',
      required: true,
      values: [
        { label: 'SQL' },
        { label: 'C#' },
        { label: 'JavaScript' },
        { label: 'Java' },
        { label: 'Python' },
        { label: 'C++' },
        { label: 'PHP' },
        { label: 'Swift' },
        { label: 'Ruby' }
      ]
    },
    {
      label: 'Star Rating',
      attrs: {
        type: 'starRating'
      },
      icon: '🌟'
    }
  ];

  replaceFields = [
    {
      type: 'textarea',
      subtype: 'tinymce',
      label: 'tinyMCE',
      required: true,
    }
  ];

  actionButtons = [{
    id: 'smile',
    className: 'btn btn-success',
    label: '😁',
    type: 'button',
    events: {
      click: function () {
        alert('😁😁😁 !SMILE! 😁😁😁');
      }
    }
  }];

  templates = {
    starRating: function (fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: function () {
          let element = <any> $(document.getElementById(fieldData.name));
          element.rateYo({ rating: 3.6 });
        }
      };
    }
  };

  inputSets = [{
    label: 'User Details',
    icon: '👨',
    name: 'user-details', // optional
    showHeader: true, // optional
    fields: [{
      type: 'text',
      label: 'First Name',
      className: 'form-control'
    }, {
      type: 'select',
      label: 'Profession',
      className: 'form-control',
      values: [{
        label: 'Street Sweeper',
        value: 'option-2',
        selected: false
      }, {
        label: 'Brain Surgeon',
        value: 'option-3',
        selected: false
      }]
    }, {
      type: 'textarea',
      label: 'Short Bio:',
      className: 'form-control'
    }]
  }, {
    label: 'User Agreement',
    fields: [{
      type: 'header',
      subtype: 'h3',
      label: 'Terms & Conditions',
      className: 'header'
    }, {
      type: 'paragraph',
      label: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
    }, {
      type: 'paragraph',
      label: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
    }, {
      type: 'checkbox',
      label: 'Do you agree to the terms and conditions?',
    }]
  }];

  typeUserDisabledAttrs = {
    autocomplete: ['access']
  };

  typeUserAttrs = {
    text: {
      className: {
        label: 'Class',
        options: {
          'red form-control': 'Red',
          'green form-control': 'Green',
          'blue form-control': 'Blue'
        },
        style: 'border: 1px solid red'
      }
    }
  };

  // test disabledAttrs
  disabledAttrs = ['placeholder'];

  fbOptions = {
    subtypes: {
      text: ['datetime-local']
    },
    onSave: function (e, formData) {
      //this.toggleEdit();
      let render_wrap = <any> $('.render-wrap');
      render_wrap.formRender({
        formData: formData,
        templates: this.templates
      });
      localStorage.setItem('formData', JSON.stringify(formData));
    },
    stickyControls: {
      enable: true
    },
    sortableControls: true,
    fields: this.fields,
    templates: this.templates,
    inputSets: this.inputSets,
    typeUserDisabledAttrs: this.typeUserDisabledAttrs,
    typeUserAttrs: this.typeUserAttrs,
    disableInjectedStyle: false,
    actionButtons: this.actionButtons,
    disableFields: ['autocomplete'],
    replaceFields: this.replaceFields,
    disabledFieldButtons: {
      text: ['copy']
    },
    formData: undefined
    // controlPosition: 'left'
    // disabledAttrs
  };
  formData = localStorage.getItem('formData');
  editing = true;
  setFormData = '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';

  formBuilder: any;
  fbPromise: any;
  fbActual: any;


  ngOnInit() { }

  ngAfterViewInit() {
    let build_wrap =<any> $('.build-wrap');
    this.formBuilder = build_wrap.formBuilder(this.fbOptions);
    this.fbPromise = this.formBuilder.promise;
    if (this.formData) {
      this.fbOptions.formData = JSON.parse(this.formData);
    }
    this.fbActual = undefined;
    this.fbPromise.then(function (fb) {

      this.fbActual ? this.fbActual = fb : this.fbActual = undefined;

      var apiBtns = {
        showData: this.fbActual.actions.showData,
        clearFields: this.fbActual.actions.clearFields,
        getData: function () {
          console.log(this.fbActual.actions.getData());
        },
        setData: function () {
          this.fbActual.actions.setData(this.setFormData);
        },
        addField: function () {
          var field = {
            type: 'text',
            class: 'form-control',
            label: 'Text Field added at: ' + new Date().getTime()
          };
          this.fbActual.actions.addField(field);
        },
        removeField: function () {
          this.fbActual.actions.removeField();
        },
        testSubmit: function () {
          var formData = new FormData(document.forms[0]);
          console.log('Can submit: ', document.forms[0].checkValidity());
          // Display the key/value pairs
          console.log('FormData:', formData);
          for (var pair of (<any>formData).entries()) {
            console.log(pair[0] + ': ' + pair[1]);
          }
        },
        resetDemo: function () {
          localStorage.removeItem('formData');
          location.reload();
        }
      };

      Object.keys(apiBtns).forEach(function (action) {
        document.getElementById(action)
          .addEventListener('click', function (e) {
            apiBtns[action]();
          });
      });

    });


  }


  toggleEdit() {
    document.body.classList.toggle('form-rendered', this.editing);
    return this.editing = !this.editing;
  }

  setLanguage(event: any) {
    this.fbActual.actions.setLang(event);
  }



  getEditForm() {
    this.toggleEdit();
  }

  getXML() {
    alert(this.formBuilder.actions.getData('xml'));
  }

  getJSON() {
    alert(this.formBuilder.actions.getData('json', true));
  }

  getJS() {
    alert('Check console');
    console.log(this.formBuilder.actions.getData());
  }
}
