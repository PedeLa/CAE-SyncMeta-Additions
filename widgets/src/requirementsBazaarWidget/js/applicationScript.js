/*
 * Copyright (c) 2019 Advanced Community Information Systems (ACIS) Group, Chair
 * of Computer Science 5 (Databases & Information Systems), RWTH Aachen
 * University, Germany All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of the ACIS Group nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

// global variables
var client,
  selectedProjectId, selectedCategoryId,
  localStorageKey = 'requirements-bazaar-widget', refreshRequirementsIntervalHandle, currentlyOpenedRequirementId;

var init = function () {
  var iwcCallback = function (intent) {
    console.log(intent);
  };
  client = new Las2peerWidgetLibrary("@@reqbazbackend", iwcCallback, '*');

  loadConnectedProject();
  if (selectedProjectId != -1 && selectedCategoryId != -1) {
    onProjectConnected();
  } else {
    onProjectDisconnected();
  }
};

/**
 * Loads the information about the Requirements Bazaar category which is
 * connected to the CAE. This information gets stored to localStorage
 * when the user selects a component in the project-management.
 */
function loadConnectedProject() {
  var storageEntryString = localStorage.getItem(localStorageKey);
  if (storageEntryString) {
    var storageEntry = JSON.parse(storageEntryString);
    storageEntry = storageEntry[localStorage.getItem("versionedModelId")];
    selectedProjectId = storageEntry.selectedProjectId;
    selectedCategoryId = storageEntry.selectedCategoryId;
  }
}

/**
 * Gets called when the Requirements Bazaar category stored in
 * localStorage could be loaded successfully.
 */
function onProjectConnected() {
  $('#requirements-list-container').show();
  $('#project-link').html(
    `<a href="@@reqbazfrontend/projects/${selectedProjectId}/categories/${selectedCategoryId}" target="_blank">this category</a>`
  );
  refreshRequirements();
  refreshRequirementsIntervalHandle = setInterval(refreshRequirements, 10000);
}


function onProjectDisconnected() {
  $('#requirements-list-container').hide();
  $('#project-link').html('');
  clearInterval(refreshRequirementsIntervalHandle);
  $('#not-connected').show();
}

/**
 * Reloads the requirements by sending a request to the
 * Requirements Bazaar API.
 */
function refreshRequirements() {
  if (selectedProjectId && selectedCategoryId) {
    client.sendRequest("GET", addAccessToken("categories/" + encodeURIComponent(selectedCategoryId) + "/requirements"),
      "", "application/json", {}, false,
      function (data, type) {
        renderRequirements(data)
      },
      function(error) {
        onProjectDisconnected();
      })
  }
}

function renderRequirements(requirements) {
  var requirementsList = $('#requirements-list');
  var requirementsHtml = '<ul class="collapsible" style="height: 300px; box-shadow: none; -webkit-box-shadow: none; -moz-box-shadow: none">';
  requirements.forEach(function (requirement) {
    requirementsHtml += renderRequirement(requirement);
  });
  requirementsHtml += '</ul>';
  requirementsList.html(requirementsHtml);
  $('.collapsible').collapsible({
    onOpenStart: function (data) {
      currentlyOpenedRequirementId = $(data).data('requirement-id');
    },
    onCloseStart: function (data) {
      var requirementId = $(data).data('requirement-id');
      if (currentlyOpenedRequirementId === requirementId) {
        currentlyOpenedRequirementId = null;
      }
    },
  });
  $('.done').click(function () {
    var requirementId = $(this).data('requirement-id');
    client.sendRequest("POST", addAccessToken("requirements/" + encodeURIComponent(requirementId) + "/realized"),
      "", "application/json", {}, false,
      function (data, type) {
        refreshRequirements();
      },
      console.error)
  });
  $('.reopen').click(function () {
    var requirementId = $(this).data('requirement-id');
    client.sendRequest("DELETE", addAccessToken("requirements/" + encodeURIComponent(requirementId) + "/realized"),
      "", "application/json", {}, false,
      function (data, type) {
        refreshRequirements();
      },
      console.error)
  })
}

function renderRequirement(requirement) {
  var actionButton;
  if (Object.keys(requirement).includes('realized')) {
    actionButton = `<a class="waves-effect waves-teal btn-flat teal-text reopen" ${isAnonymous() ? 'disabled="true"' : ''} data-requirement-id="${requirement.id}" >Reopen</a>`;
  } else {
    actionButton = `<a class="waves-effect waves-teal btn-flat teal-text done" ${isAnonymous() ? 'disabled="true"' : ''} data-requirement-id="${requirement.id}" >Done</a>`
  }
  return `<li data-requirement-id="${requirement.id}" ${currentlyOpenedRequirementId == requirement.id ? 'class="active"' : ''}>
      <div class="collapsible-header" style="font-weight: bold">${requirement.name}</div>
      <div class="collapsible-body" style="padding-left: 0; padding-right: 0;">
        <p style="margin-left: 24px;margin-right: 24px; margin-bottom: 24px">${requirement.description}</p>
        <div class="" style="margin-bottom: 0; border-top: 1px solid rgba(160,160,160,0.2); padding-top: 16px;">
            <a class="waves-effect waves-teal btn-flat teal-text done" target="_blank" 
            href="@@reqbazfrontend/projects/${selectedProjectId}/categories/${selectedCategoryId}/requirements/${requirement.id}" >View</a>
    ${actionButton}
    </div>
    </div>
    </li>`;
}

function isAnonymous() {
  return localStorage.getItem('access_token') === null;
}

function addAccessToken(url) {
  if (isAnonymous()) {
    return url;
  }

  if (url.indexOf("\?") > 0) {
    url += "&access_token=" + localStorage["access_token"];
  } else {
    url += "?access_token=" + localStorage["access_token"];
  }
  return url;
}

$(document).ready(function () {
  init();
});

