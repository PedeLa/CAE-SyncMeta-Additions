import { LitElement, html } from "lit-element";
import "./versioning/versioning-element.js";
import Common from "./util/common.js";
import Static from "./static.js";
import "@polymer/iron-icon";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import "../../node_modules/@polymer/paper-button/paper-button.js";

/**
 * @customElement
 * @polymer
 */
class AllApplications extends LitElement {
  render() {
    return html`
      <style>
@keyframes ldio-eec3ctrm1go {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
.ldio-eec3ctrm1go > div > div {
  position: absolute;
  border-radius: 50%;
}
.ldio-eec3ctrm1go > div > div:nth-child(1) {
  top: 9px;
  left: 9px;
  width: 82px;
  height: 82px;
  background: #df1317;
}
.ldio-eec3ctrm1go > div > div:nth-child(2) {
  top: 13.920000000000002px;
  left: 30.32px;
  width: 39.36px;
  height: 39.36px;
  background: #e4934b;
  animation: ldio-eec3ctrm1go 1s linear infinite;
  transform-origin: 19.68px 36.08px;
}
.loadingio-spinner-disk-wamj36whduk {
  width: 24px;
  height: 24px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-eec3ctrm1go {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.24);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-eec3ctrm1go div { box-sizing: content-box; }
/* generated by https://loading.io/ */
        .deploy-paper {
          padding: 30px;
          width: 100%;
          background: radial-gradient(bisque, floralwhite);
        }
        .deployment-info {
          text-align: center;
          align-items: center;
        }
        .summary-see-release {
          padding: 1em;
        }
        .summary {
          padding: 1em;
        }
        .see-releases-paper {
          width: 100%;
        }
        .release-deployments-paper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-content: center;
          padding: 2em;
        }
        .running-applications-paper {
          width: 100%;
          margin-top: 1em;
        }
        .running-applications {
          display: flex;
          margin-top: 1em;
          align-items: center;
          padding: 2em;
        }
        .running-applications:hover {
          background: #eeeeee;
        }
        .running-applications-content {
          width: 100%;
          height: 100%;
          align-items: flex-end;
          display: flex;
          align-content: center;
        }
        .open-running-applications {
          align-items: center;
          display: flex;
          align-content: center;
          color: rgb(240, 248, 255);
          background: rgb(30, 144, 255);
          max-height: 30px;
        }
        .open-release-application {
          align-items: center;
          align-content: center;
          color: rgb(240, 248, 255);
          background: rgb(30, 144, 255);
        }
        .stop-release-application {
          align-items: center;
          align-content: center;
          color: rgb(240, 248, 255);
          background: red;
        }
        .open-running-applications:hover {
          color: rgb(240, 248, 255);
          background: rgb(65, 105, 225);
        }
        .edit-running-applications {
          width: 50%;
          height: 50%;
          align-items: center;
          display: flex;
          align-content: center;

          color: rgb(240, 248, 255);
          background: rgb(252, 194, 3);
          max-height: 30px;
        }
        .edit-running-applications:hover {
          color: rgb(240, 248, 255);
          background: rgb(232, 178, 0);
        }
        .outer {
          display: flex;
          flex-flow: column;
          height: 100%;
        }
        .nothing-deployed {
          text-align: center;
          margin: auto;
          width: 100%;
          height: 100%;
          border: 3px solid green;
          padding: 10px;
        }
      </style>

      ${this.runningApplications.length != 0
        ? html` <div>
            ${this.runningApplications.map(
              (app) => html`
                <paper-card class="running-applications-paper">
                  <div class="running-applications">
                    <div class="running-applications-content">${app.name}</div>
                    <div class="running-applications-content">
                      Number of releases: ${Object.keys(app.releases).length}
                    </div>

                    <paper-button
                      class="edit-running-applications"
                      @click=${(e) => {
                        this._onEditAppClicked(
                          app.releases[Object.keys(app.releases)[0]].supplement
                            .id
                        );
                      }}
                      >Edit app</paper-button
                    >
                  </div>
                  <paper-card class="see-releases-paper">
                    <details>
                      <summary class="summary-see-release">
                        See Releases
                      </summary>
                      ${Object.keys(app.releases).map(
                        (release) => html`
                          <div
                            style="display: flex; flex-direction: row;align-items: center;align-content: center; border: 1px solid grey;"
                          >
                            <details style="flex-grow: 4; ">
                              <summary class="summary">
                              <div style="display:flex; flex-direction: column; margin-left:20px">
                              <div>Deployments of release version: ${release} </div>
                              <div>Created by: ${app.releases[release].supplement.users} </div>
                              <div>Number of deployments: ${app.releases[release].instances.length} </div>
                              </div>
                                   
                              </summary>
                              ${app.releases[release].instances.map(
                                (deployment) =>
                                  html` <div>
                                    <paper-card
                                      class="release-deployments-paper"
                                    >
                                      <div class="deployment-info">
                                        ${deployment.clusterName} Time:
                                        ${deployment.time}
                                      </div>
                                      <div>
                                        <paper-button
                                          class="open-release-application"
                                          @click=${(e) => {
                                            this._onOpenAppClicked(
                                              deployment.link
                                            );
                                          }}
                                          >Open app</paper-button
                                        >
                                        <paper-button
                                          class="stop-release-application"
                                          id="button-${deployment.clusterName}"
                                          @click=${(e) => {
                                            this._onUndeployButtonClicked(
                                              deployment, deployment.clusterName
                                            );
                                          }}
                                          ><div id="text-${deployment.clusterName}">Stop deployment</div>
                                          <div id="indicator-${deployment.clusterName}" style="display:none;">
                                          <div class="loadingio-spinner-disk-wamj36whduk"><div class="ldio-eec3ctrm1go">
<div><div></div><div></div></div>
</div></div>
                                          </div>
                                          </paper-button
                                        >
                                      </div>
                                    </paper-card>
                                  </div>`
                              )}
                            </details>
                            <div style="padding-right: 55px;">
                              <paper-button
                                class="open-running-applications"
                                @click=${(e) => {
                                  this._openDeployInfoSection(
                                    app.releases[release]
                                  );
                                }}
                                >Deploy instance</paper-button
                              >
                            </div>
                          </div>
                        `
                      )}
                    </details>
                  </paper-card>
                </paper-card>

                <div id="${app.name}" style="display: none">
                  <paper-card class="deploy-paper">
                    ${this.selectedRelease != undefined
                      ? html`
                          <div
                            style="display:flex; flex-direction: column; flex-grow: 4;"
                          >
                            <div style="display:flex; flex-direction: column;">
                              <div
                                style="display:flex; flex-direction: row;justify-content: space-between;align-items: center;align-content: center;"
                              >
                                <div>Name</div>
                                <paper-icon-button
                                  icon="close"
                                  @click=${(e) => {
                                    this._closeDeployInfoSection(app.name);
                                  }}
                                ></paper-icon-button>
                              </div>
                              <span
                                class="textbox"
                                style="display:flex; flex-direction: row;"
                              >
                                <paper-input
                                  type="text"
                                  id="release-name-input"
                                  name="country"
                                  value="${this.selectedRelease.supplement
                                    .name}-"
                                  readonly
                                ></paper-input>
                                <paper-input
                                  id="name-input"
                                  type="text"
                                  .value="${this.clusterNamePostfix}"
                                  value="{{clusterNamePostfix}}"
                                ></paper-input>
                              </span>
                            </div>
                            <div style="display:flex; flex-direction: column;">
                              URL
                              <span
                                class="textbox"
                                style="display:flex; flex-direction: row;"
                              >
                                <paper-input
                                  id="url-input"
                                  type="text"
                                  .value="${this.urlDefaultValue}"
                                ></paper-input>
                              </span>
                            </div>
                          </div>
                        `
                      : `Select a Release`}

                    <paper-card>
                      <paper-button
                        id="deployment-button"
                        class="paper-button-blue"
                        ?disabled=${false}
                        @click=${(e) => {
                          this._onDeployReleaseButtonClicked(
                            this.selectedRelease
                          );
                        }}
                      >
                        Deploy own Release
                      </paper-button>
                    </paper-card>
                  </paper-card>
                </div>
              `
            )}
          </div>`
        : html`<div class="outer">
            <paper-card class="nothing-deployed">Nothing deployed</paper-card>
          </div>`}

      <paper-toast id="toast" text="Will be changed later."></paper-toast>
    `;
  }

  _openDeployInfoSection(release) {
    this.selectedRelease = release;
    console.log(release);
    console.log(release.supplement.name);
    if (
      this.shadowRoot.getElementById(release.supplement.name).style.display ==
      "none"
    ) {
      this.shadowRoot.getElementById(release.supplement.name).style.display =
        "block";
    } else {
      this.shadowRoot.getElementById(release.supplement.name).style.display =
        "none";
    }
  }

  _closeDeployInfoSection(id) {
    this.shadowRoot.getElementById(id).style.display = "none";
  }
  _onOpenAppClicked(link) {
    window.open(link, "_blank");
  }
  _onEditAppClicked(id) {
    window.open(
      Static.WebhostURL + "/cae-deploy/test-deploy/" + id.toString(),
      "_blank"
    );
  }
  static get properties() {
    return {
      pendingDots: {
        type: Number,
      },
      selectedRelease: {
        type: Object,
      },
      runningApplications: {
        type: Array,
      },
      clusterNamePostfix: {
        type: String,
      },
      urlDefaultValue: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.runningApplications = [];
    this.getAllRunningApplications();
    this.clusterNamePostfix = "";
    this.urlDefaultValue =
      "https://mentoring.tech4comp.dbis.rwth-aachen.de/deployment/";
    this.pendingDots = 0;
  }

  showToast(text) {
    const toastElement = this.shadowRoot.getElementById("toast");
    toastElement.text = text;
    toastElement.show();
  }

  getDeploymentButton() {
    return this.shadowRoot.getElementById("deployment-button");
  }

  async getAllRunningApplications() {
    var services = [];
    await fetch(Static.RegistryURL + `/las2peer/services/services`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        services = data;
        if (services == []) {
          this.showToast("No deployments");
        }
      })
      .catch((_) => {
        this.showToast("Error probably down");
      });
    services.forEach((service) => {
      Object.keys(service.releases).forEach((releaseVersion) => {
        if (
          service.releases[releaseVersion].supplement.type == "cae-application"
        ) {
          if (this.runningApplications.indexOf(service) == -1) {
            this.runningApplications.push(service);
          }
        }
      });
    });
    this.requestUpdate();
  }

  // undeploy instance of selected release
  async _onUndeployButtonClicked(deployment, buttonId) {
    this.setUndeployButtonLoading(buttonId);
    await fetch(
      Static.ModelPersistenceServiceURL +
        "/deploy/" +
        String(deployment.id) +
        "/" +
        "UndeployFromCluster",
      {
        method: "POST",
        body:
          '{"name":"' +
          deployment.name +
          '","clusterName":"' +
          deployment.clusterName +
          '","version":"' +
          deployment.version +
          '"}',
      }
    )
      .then((response) => {
        if(response.status == "200"){
          this.setUndeployButtonLoading(buttonId);
          return response.text();
        }
        else{
          throw new Error(response.status);
        }
      })
      .then((data) => {
        console.log(data);
        this.pollJobConsoleText(data, buttonId)
      }).catch((e) =>{
        console.log(e);
        this.setUndeployButtonDone(buttonId);
      });
  }

  setUndeployButtonLoading(buttonId){
    var undeployButton = this.shadowRoot.getElementById("button-" + buttonId);
    var undeployButtonText = this.shadowRoot.getElementById("text-" + buttonId);
    var indicatorUndeployButton = this.shadowRoot.getElementById("indicator-" + buttonId);

    undeployButton.disabled = true;
    undeployButton.style = "background:rgb(191, 116, 81);";
    undeployButtonText.innerText = "Undeploying"

    indicatorUndeployButton.style = "display:block;";
    indicatorUndeployButton.disabled = true;
  }

  setUndeployButtonDone(buttonId){
    var undeployButton = this.shadowRoot.getElementById("button-" + buttonId);
    var undeployButtonText = this.shadowRoot.getElementById("text-" + buttonId);
    var indicatorUndeployButton = this.shadowRoot.getElementById("indicator-" + buttonId);

    undeployButton.disabled = false;
    undeployButtonText.innerText = "Undeployed"
    undeployButton.style = "background: rgb(228, 154, 199);";

    indicatorUndeployButton.style = "display:none;";
    indicatorUndeployButton.disabled = false;
  }

  setUndeployButtonError(buttonId){
    var undeployButton = this.shadowRoot.getElementById("button-" + buttonId);
    var undeployButtonText = this.shadowRoot.getElementById("text-" + buttonId);
    var indicatorUndeployButton = this.shadowRoot.getElementById("indicator-" + buttonId);

    undeployButton.disabled = false;
    undeployButtonText.innerText = "Error"
    undeployButton.style = "background: rgb(255, 154, 155);";

    indicatorUndeployButton.style = "display:none;";
    indicatorUndeployButton.disabled = false;
  }

  pollJobConsoleText(location, buttonId) {
    setTimeout(
      function () {
        this.getJobConsoleText(location, buttonId);
      }.bind(this),
      1000
    );
  }

  getJobConsoleText(queueItem, buttonId) {
    fetch(
      Static.ModelPersistenceServiceURL +
        "/deployStatus?queueItem=" +
        queueItem,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if(response.status != 200){
          throw new Error(response.status)
        }
        else{
          return response.text();
        }
      })
      .then((data) => {
        if (data.indexOf("Pending") > -1) {
          this.setUndeployButtonLoading(buttonId);
          this.pollJobConsoleText(queueItem, buttonId);
        } else if (data.indexOf("Done") > -1) {
          this.setUndeployButtonDone(buttonId);
        } else if (data.indexOf("Finished: SUCCESS") > -1) {
          this.setUndeployButtonDone(buttonId);
        } else if (data.indexOf("Finished: FAILURE") > -1) {
          this.setUndeployButtonError(buttonId);
        } else {
          this.pollJobConsoleText(queueItem, buttonId);
        }
      }).catch((e) => {
        this.setUndeployButtonError(buttonId);
      });
  }
  // deploy own instance of selected release
  // user can choose release version to deploy

  async _onDeployReleaseButtonClicked(releaseData) {
    var deployNameAvailable = true;
    this.clusterNamePostfix = this.shadowRoot.getElementById(
      "name-input"
    ).value;
    this.shadowRoot.getElementById("name-input").value;

    var clusterName =
      this.selectedRelease.supplement.name.normalize() +
      "-" +
      this.clusterNamePostfix;
    console.log(clusterName);
    deployNameAvailable = await this.checkIfDeploymentNameAvailable(
      clusterName
    );
    console.log(releaseData);
    var deploymentData = {};
    deploymentData["id"] = releaseData.supplement.id;
    deploymentData["name"] = releaseData.supplement.name;
    deploymentData["clusterName"] = clusterName;
    deploymentData["version"] = releaseData.supplement.version;
    deploymentData["type"] = releaseData.supplement.type;
    console.log(deploymentData);
    if (deployNameAvailable == true) {
      // disable button until release has finished
      // this.getDeploymentButton().disabled = true;
      this._sendDeploymentRequest("DeployToCluster", deploymentData);
    } else {
      this.showToast("Name already taken, choose another one");
    }
  }

  async _sendDeploymentRequest(jobAlias, deploymentData) {
    console.log(JSON.stringify(deploymentData));
    deploymentData;
    var id = deploymentData.id;
    if (!id) {
      this.showToast("Error getting project id");
    } else {
      var validName = /^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*)$/.test(
        deploymentData.clusterName
      );
      if (validName == false) {
        this.showToast("Name invalid, only use low letters and -, _ if needed");
      } else {
        fetch(
          Static.ModelPersistenceServiceURL +
            "/deploy/" +
            String(id) +
            "/" +
            jobAlias,
          {
            method: "POST",
            body: `${JSON.stringify(deploymentData)}`,
          }
        )
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            if (data.indexOf("Error") > -1) {
              console.error(data);
              this.showToast("Error calling deployment server");
              this.getDeploymentButton().disabled = false;
            } else {
              this.pollDeploymentJobConsoleText(data);
            }
          });
      }
    }
  }
  async checkIfDeploymentNameAvailable(clusterName) {
    var deployments = [];
    await fetch(Static.RegistryURL + "/las2peer/services/deployments", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        deployments = data;
      });
    var nameAvailable = true;
    Object.keys(deployments).forEach((release) => {
      deployments[release].forEach((deployment) => {
        if (deployment.clusterName.normalize() == clusterName) {
          nameAvailable = false;
        }
      });
    });
    return nameAvailable;
  }

  pollDeploymentJobConsoleText(location) {
    // this.getDeploymentStatusTextarea().removeAttribute("hidden");
    this.getDeploymentButton().disabled = true;
    setTimeout(
      function () {
        var feedbackString =
          "Deployment in progress " + Array(this.pendingDots + 1).join(".");
        // this.getDeploymentStatusInput().value = feedbackString;
        this.getDeploymentJobConsoleText(location);
      }.bind(this),
      1000
    );
  }
  getDeploymentJobConsoleText(queueItem) {
    fetch(
      Static.ModelPersistenceServiceURL +
        "/deployStatus?queueItem=" +
        queueItem,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data.indexOf("Pending") > -1) {
          data =
            "Deployment " + "pending" + Array(this.pendingDots + 1).join(".");
        }

        // this.deploymentPendingDots = (this.deploymentPendingDots + 1) % 4;

        // this.getDeploymentStatusTextarea().style.removeProperty("display");
        // this.getDeploymentStatusTextarea().value = data;

        if (data.indexOf("Finished: SUCCESS") > -1) {
          this.getDeploymentButton().disabled = false;

          // this.setDeploymentStatus(null);
          // this.getDeploymentStatusInput().value =
          //   "Your CAE application has been deployed";
          this.showToast("Your CAE application has been deployed");
          // this.getDeploymentStatusTextarea().style.setProperty("display", "none");
          // allow to deploy again by activating the deploy button
          // this.getDeploymentButton().disabled = false;
        } else if (data.indexOf("Finished: FAILURE") > -1) {
          this.getDeploymentButton().disabled = false;

          this.showToast("Error during deployment");
        } else {
          this.pollDeploymentJobConsoleText(queueItem);
        }
      });
  }
}

window.customElements.define("all-applications", AllApplications);
