import {html, LitElement} from 'lit-element';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

/**
 * PolymerElement for management of project components and users.
 * TODO: Update Documentation when functionality of this element is final.
 * This element allows to list the users of a project, to add users to a project,
 * to remove users from a project and to change their role in a project.
 */
class ProjectInfo extends LitElement {
  render() {
    return html`
      <style>
        :host {
          font-family: Roboto;
        }
        .main{
          width: 100%;
          margin-top: 1em;
          height: 600px;
          border-left: thin solid #e1e1e1;
          padding-top: 0.1em;
        }
        .dropdown-menu-project {
          width: 100%;
        }
        .separator {
           border-top: thin solid #e1e1e1;
        }
        .input {
          width: 100%;
          margin-right: 0.5em;
          border-radius: 3px;
          border: thin solid #e1e1e1;
          height: 2.5em;
          padding-left:5px;
        }
        paper-button {
          color: rgb(240,248,255);
          background: rgb(30,144,255);
          height: 2.5em;
        }
        paper-button:hover {
          color: rgb(240,248,255);
          background: rgb(65,105,225);
        }
        paper-button[disabled] {
          background: #e1e1e1;
        }
        .button-danger {
          background: rgb(255,93,84);
        }
        .button-danger:hover {
          background: rgb(216,81,73);
        }
        .edit-icon {
          color: #c6c6c6;
        }
        .components {
          margin-left: 1em;
          margin-right: 1em;
        }
        paper-tabs {
          --paper-tabs-selection-bar-color: rgb(30,144,255);
        }
        .label {
          color: #586069;
          border: 1px solid #e1e1e1;
          margin-top: auto;
          margin-bottom: auto;
          padding: 0.1em 0.2em;
          border-radius: 3px;
        }
        .github-a {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: 1em;
        }
        .github-img {
          width: 1.5em;
          height: 1.5em;
        }
      </style>
      <div class="main">
        ${this.selectedProject ?
      html`
            <!-- Title of project -->
            <div class="project-title" style="margin-left: 1em; margin-right: 1em; margin-top: 1em">
              <h3>${this.selectedProject.name}</h3>
            </div>
            
            <!-- Frontend and Microservice Components of the project -->
            <div class="components">
              <paper-tabs selected="0">
                <paper-tab @click="${() => this._onTabChanged(0)}">Frontend Components</paper-tab>
                <paper-tab @click="${() => this._onTabChanged(1)}">Microservice Components</paper-tab>
              </paper-tabs>
              ${this.currentlyShownComponents.map(component => html`
                <div style="display: flex">
                  <p>${component.name}</p>
                  <div style="margin-left: auto; margin-top: auto; margin-bottom:auto; height: 100%; display: flex">
                    <!-- Label for dependencies -->
                    ${component.type == "dependency" ? html`<span class="label">Dependency</span>` : html``}
                    <!-- Label for external dependencies -->
                    ${component.type == "external_dependency" ? html`<span class="label">External Dependency</span>` : html``}
                    <!-- Link to GitHub (or later maybe GitLab) -->
                    <a href="${component.github_url}" class="github-a">
                      <img src="https://raw.githubusercontent.com/primer/octicons/master/icons/mark-github.svg" class="github-img">
                    </a>
                  </div>
                </div>
                <div class="separator"></div>
              `)}
            </div>
            
            <!-- Application Component -->
            <div class="application-component" style="margin-left: 1em; margin-right: 1em">
              <h4>Application Component</h4>
              <div style="display: flex">
                <a href="/cae-modeling">Open in Modeling Space</a>
                <a href="https://github.com" style="margin-left: auto; margin-top: auto; margin-bottom: auto">
                  <img src="https://raw.githubusercontent.com/primer/octicons/master/icons/mark-github.svg" class="github-img">
                </a>
              </div>
              <div class="separator"></div>
            </div>
            
            <!-- Requirements Bazaar -->
            <div class="requirements-bazaar" style="margin-left: 1em; margin-right: 1em">
              <h4>Requirements Bazaar</h4>
                ${this.isConnectedToReqBaz ? html`Connected.` : html`
                  <p>This CAE project is not connected to the Requirements Bazaar yet. Select a project and category to connect:</p>
                  <div style="display: flex">
                    <input class="input-reqbaz-url input" @input="${(e) => this._onReqBazURLChanged(e.target.value)}" placeholder="Paste URL to Category" style="margin-left: 0"></input>
                    <paper-button @click="${this._onConnectReqBazClicked}" ?disabled="${!this.urlMatchesReqBazFormat}" style="margin-left: auto">Add</paper-button>
                  </div>
                  ${this.urlMatchesReqBazFormat ? html`` : html`<p>Entered URL does not match the required format.</p>`}
                `}
              <div class="separator"></div>
            </div>
            
            <!-- Users of the project -->
            <div class="user-list" style="margin-left: 1em; margin-right: 1em; overflow: auto; max-height: 25em">
              <h4>Users</h4>
              ${this.userList.map(user => html`
                <div style="width: 100%; display: flex; align-items: center">
                  <p>${user.name}</p>
                  <p style="margin-right: 0.5em; margin-left: auto">${user.role}</p>
                  <iron-icon @click="${() => this._userEditButtonClicked(user)}" class="edit-icon" icon="create"></iron-icon>
                </div>
                <div class="separator"></div>
              `)}
            </div>
            
            <!-- Add users to the project -->
            <div class="add-user" style="display: flex; margin-top: 0.5em; margin-left: 1em; margin-right: 1em; margin-bottom: 1em">
              <input class="input-username input" placeholder="Enter Username" style="margin-left: 0"></input>
              <paper-button @click="${this._onAddUserToProjectClicked}" style="margin-left: auto">Add</paper-button>
            </div>
          ` :
      html`
            <div class="project-title" style="margin-left: 1em; margin-right: 1em; margin-top: 1em">
              <p>No project selected.</p>
            </div>
          `
    }
      </div>
      
      <!-- Dialog for editing user in a project. -->
      <paper-dialog id="dialog-edit-user">
        <h2>Edit User: ${this.editingUser ? html`${this.editingUser.name}` : html``}</h2>
        
        <paper-dropdown-menu label="Select Role">
          <paper-listbox slot="dropdown-content" selected="1">
            <paper-item>Frontend Modeler</paper-item>
            <paper-item>Application Modeler</paper-item>
            <paper-item>Backend Modeler</paper-item>
            <paper-item>Software Engineer</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>
        
        <div style="align-items: center">
          <paper-button class="button-danger">Remove From Project</paper-button>
        </div>
        
        <div>
          <paper-button @click="${this._closeEditUserDialogClicked}">Cancel</paper-button>
          <paper-button>Save</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  static get properties() {
    return {
      userList: {
        type: Array
      },
      selectedProject: {
        type: Object
      },
      editingUser: {
        type: Object
      },
      currentlyShownComponents: {
        type: Array
      },
      isConnectedToReqBaz: {
        type: Boolean
      },
      /**
       * When the user enters an URL to the Requirements Bazaar,
       * this property is used to tell whether the entered
       * URL matches the required format.
       */
      urlMatchesReqBazFormat: {
        type: Boolean
      }
    }
  }

  constructor() {
    super();
    this.userList = [];
    this.currentlyShownComponents = [];
    this.isConnectedToReqBaz = false;
    this.urlMatchesReqBazFormat = false;
  }

  /**
   * Gets called when the CAE project is not yet
   * connected to the Requirements Bazaar and the user updates the
   * URL to the Requiremenets Bazaar category.
   * @param t
   * @private
   */
  _onReqBazURLChanged(url) {
    console.log(url);
    const regexp = new RegExp("https:\/\/requirements-bazaar\.org\/projects\/(\\d+)\/categories\/(\\d+)");
    this.urlMatchesReqBazFormat = regexp.test(url);
  }

  /**
   * Gets called when the Connect button for the Requirements Bazaar
   * gets clicked.
   * The button is only clickable if the entered url matches the required
   * format for a category on the Requirements Bazaar.
   * @private
   */
  _onConnectReqBazClicked() {
    this.isConnectedToReqBaz = true;
  }

  /**
   * Gets called when the user wants to close
   * the edit user dialog.
   * @private
   */
  _closeEditUserDialogClicked() {
    this.shadowRoot.getElementById("dialog-edit-user").close();
  }

  _userEditButtonClicked(user) {
    this.editingUser = user;
    this.shadowRoot.getElementById("dialog-edit-user").open()
  }

  /**
   * Gets called by the parent element (ProjectManagement page)
   * when the user selects a project in the project explorer.
   * @param project Project that got selected in the explorer.
   * @private
   */
  _onProjectSelected(project) {
    this.selectedProject = project;
    this.userList = this.getUsersByProject(project.id);

    // TODO: only for frontend testing
    this.currentlyShownComponents = this.getFrontendComponentsByProject(project.id);
  }

  _onAddUserToProjectClicked() {
    console.log("add user to project clicked");
  }

  _onTabChanged(tabIndex) {
    const projectId = this.selectedProject.id;
    if(tabIndex == 0) {
      this.currentlyShownComponents = this.getFrontendComponentsByProject(projectId);
    } else {
      this.currentlyShownComponents = this.getMicroserviceComponentsByProject(projectId);
    }
  }

  getUsersByProject(projectId) {
    if(projectId == 1) {
      return [
        {
          "id": 1,
          "name": "Alice",
          "role": "Frontend Modeler"
        },
        {
          "id": 2,
          "name": "Bob",
          "role": "Software Engineer"
        },
        {
          "id": 3,
          "name": "Dave",
          "role": "Frontend Modeler"
        }
      ];
    }
    if(projectId == 2) {
      return [
        {
          "id": 3,
          "name": "Dave",
          "role": "Frontend Modeler"
        },
        {
          "id": 4,
          "name": "Chris",
          "role": "Software Engineer"
        }
      ];
    }
    if(projectId == 3) {
      return [
        {
          "id": 4,
          "name": "Chris",
          "role": "Software Engineer"
        }
      ];
    }
    if(projectId == 4) {
      return [
        {
          "id": 4,
          "name": "Chris",
          "role": "Software Engineer"
        },
        {
          "id": 2,
          "name": "Bob",
          "role": "Software Engineer"
        }
      ]
    }
  }

  // TODO: only for testing frontend
  getFrontendComponentsByProject(projectId) {
    return [
      {
        "name": "Frontend Component 1",
        "type": "standard",
        "github_url": "https://github.com"
      },
      {
        "name": "Frontend Component 2",
        "type": "dependency",
        "github_url": "https://github.com"
      },
      {
        "name": "Frontend Component 3",
        "type": "external_dependency",
        "github_url": "https://github.com"
      }
    ];
  }

  // TODO: only for testing frontend
  getMicroserviceComponentsByProject(projectId) {
    return [
      {
        "name": "Microservice 1",
        "type": "standard",
        "github_url": "https://github.com"
      },
      {
        "name": "Microservice 2",
        "type": "standard",
        "github_url": "https://github.com"
      },
      {
        "name": "Microservice 3",
        "type": "dependency",
        "github_url": "https://github.com"
      }
    ];
  }
}

customElements.define('project-info', ProjectInfo);
