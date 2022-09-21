import React from 'react';
import { instanceSettingsService, authenticationService } from '@/_services';
import { Header } from '@/_components';
import { toast } from 'react-hot-toast';
import ReactTooltip from 'react-tooltip';
import { withTranslation } from 'react-i18next';

class ManageInstanceSettingsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      isSaving: false,
      errors: {},
      options: {},
    };
  }

  componentDidMount() {
    this.fetchSettings();
  }

  fetchSettings = () => {
    instanceSettingsService.fetchSettings().then((data) => {
      const allow_personal_workspace = data.settings?.find((setting) => setting.key === 'ALLOW_PERSONAL_WORKSPACE');
      const allow_plugin_integration = data.settings?.find((setting) => setting.key === 'ALLOW_PLUGIN_INTEGRATION');
      this.setState({
        options: {
          allow_personal_workspace: {
            value: allow_personal_workspace.value,
            id: allow_personal_workspace.id,
          },
          allow_plugin_integration: {
            value: allow_plugin_integration.value,
            id: allow_plugin_integration.id,
          },
        },
      });
    });
  };

  saveSettings = () => {
    instanceSettingsService
      .update(this.state.options)
      .then(() => {
        toast.success('Instance settings have been updated', {
          position: 'top-center',
        });
        this.setState({ isSaving: false });
        this.fetchSettings();
      })
      .catch(({ error }) => {
        toast.error(error, { position: 'top-center' });
        this.setState({ isSaving: false });
      });
  };

  optionsChanged = (key) => {
    const options = this.state.options;
    options[`${key}`].value = !options[`${key}`].value === 'true' ? 'true' : 'false';
    this.setState({
      options,
    });
  };

  render() {
    const { options, isSaving } = this.state;
    return (
      <div className="wrapper org-users-page">
        <Header switchDarkMode={this.props.switchDarkMode} darkMode={this.props.darkMode} />
        <ReactTooltip type="dark" effect="solid" delayShow={250} />

        <div className="page-wrapper">
          <div className="container-xl">
            <div className="page-header d-print-none">
              <div className="row align-items-center">
                <div className="col">
                  <div className="page-pretitle"></div>
                  <h2 className="page-title" data-cy="users-page-title">
                    {this.props.t(
                      'header.organization.menus.manageInstanceSettings.manageInstanceSettings',
                      'Manage Instance Settings'
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="page-body container-xl">
            <div className="card">
              <div className="card-header">
                <div className="card-title" data-cy="card-title">
                  {this.props.t(
                    'header.organization.menus.manageInstanceSettings.instanceSettings',
                    'Instance Settings'
                  )}
                </div>
              </div>
              <div className="card-body">
                {Object.entries(options) != 0 && (
                  <form noValidate>
                    <div className="form-group mb-3">
                      <label className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => this.optionsChanged('allow_personal_workspace')}
                          checked={options.allow_personal_workspace.value === 'true'}
                          data-cy="form-check-input"
                        />
                        <span className="form-check-label" data-cy="form-check-label">
                          {this.props.t(
                            'header.organization.menus.manageSSO.generalSettings.allowPersonalWorkspace',
                            'Allow Personal Workspace'
                          )}
                        </span>
                      </label>
                      <div className="help-text">
                        <div data-cy="instance-settings-help-text">
                          {this.props.t(
                            'header.organization.menus.manageSSO.generalSettings.allowPersonalWorkspaceDetails',
                            `This feature will enable users to create their own workspace`
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => this.optionsChanged('allow_plugin_integration')}
                          checked={options.allow_plugin_integration.value === 'true'}
                          data-cy="form-check-input"
                        />
                        <span className="form-check-label" data-cy="form-check-label">
                          {this.props.t(
                            'header.organization.menus.manageSSO.generalSettings.allowPluginIntegration',
                            'Allow Plugin Integration'
                          )}
                        </span>
                      </label>
                    </div>

                    <div className="form-footer">
                      <button type="button" className="btn btn-light mr-2" onClick={this.reset} data-cy="cancel-button">
                        {this.props.t('globals.cancel', 'Cancel')}
                      </button>
                      <button
                        type="button"
                        className={`btn mx-2 btn-primary ${isSaving ? 'btn-loading' : ''}`}
                        disabled={isSaving}
                        onClick={this.saveSettings}
                        data-cy="save-button"
                      >
                        {this.props.t('globals.save', 'Save')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const ManageInstanceSettings = withTranslation()(ManageInstanceSettingsComponent);
