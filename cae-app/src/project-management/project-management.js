import {html, LitElement} from 'lit-element';
import './project-explorer';
import './project-info';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import Auth from "../auth";

/**
 * PolymerElement for the project management page of the CAE.
 * TODO: Update Documentation when functionality of this element is final.
 * This element will contain the Project Management Widget and the
 * Project User Widget.
 */
class ProjectManagement extends LitElement {
  render() {
    return html`
      <!--<p>This is the Project Management page.</p>
      <a href="/cae-modeling">Link to Modeling</a>-->
      
      <style>
        :host {
          font-family: Roboto;
        }
      </style>
      
      <custom-style>
        <style is="custom-style">
          .flex-horizontal-with-ratios {
            @apply --layout-horizontal;
          }
          .flex-project-info {
            @apply --layout-flex;
          }
          .flex-project-explorer {
            @apply --layout-flex;
            margin-right: 1em;
          }
        </style>
      </custom-style>
      
      ${Auth.isAccessTokenAvailable() ? html`
        <div class="container flex-horizontal-with-ratios">
          <div class="flex-project-explorer">
            <project-explorer id="project-explorer" 
                @project-selected-event="${(e) => this._onProjectSelected(e.detail)}"></project-explorer>
          </div>
          <div class="flex-project-info">
            <project-info id="project-info"></project-info>
          </div>
        </div>
      ` : html `
        <div style="margin-left: 1em">
          <p>Please login first.</p>
        </div>
      `}
    `
  }

  /**
   * Gets called when a user selects a project in the project explorer.
   * Notifies the project user widget about this event.
   * @param eventDetail Details of the event sent from the explorer.
   * @private
   */
  _onProjectSelected(eventDetail) {
    this.getProjectInfo()._onProjectSelected(eventDetail.project);
  }

  getProjectInfo() {
    return this.shadowRoot.getElementById("project-info");
  }
}

customElements.define('project-management', ProjectManagement);
