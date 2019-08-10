/**
 * Created by eyoryas on 03-Dec-18.
 */
/* globals localStorage */
import auth from '@/controller/authController2'

export default {
  accessView(view) {
    // this is fake solution. --start code--
    const userInfo = auth.getAuthUser();
    let userInfoRoleTypeCode;
    //TODO : If user new registered RoleType is null.
    if (userInfo && userInfo.access) {
      userInfoRoleTypeCode = userInfo.access
    } else if (userInfo && userInfo.body) {
      userInfoRoleTypeCode = 2; // TODO: Temporary Solution
    } else {
      auth.logout();
      return;
    }
    /*if (userInfo && userInfo.body && userInfo.body.epPartyRoleDtos.length && userInfo.body.epPartyRoleDtos[0].partyRoleTypeCd) {
      userInfoRoleTypeCode = userInfo.body.epPartyRoleDtos[0].partyRoleTypeCd;
    } else if (userInfo && userInfo.body) {
      userInfoRoleTypeCode = 2; // TODO: Temporary Solution
    } else {
      auth.logout();
      return;
    }*/
    let userViewAccess = false;
    const dashboardTypeRoleArray = {
      dashboard: {
        userAccess: [1, 2, 3, 4, 5]
      },
      individuals: {
        userAccess: [1, 5]
      },
      organization: {
        userAccess: [1, 5]
      },
      products: {
        userAccess: [1, 2, 3, 4, 5]
      },
      offers: {
        userAccess: [1, 2, 3, 4, 5]
      },
      services: {
        userAccess: [1, 2, 3, 4, 5]
      },
      resources: {
        userAccess: [1, 2, 3, 4, 5]
      },
      profile: {
        userAccess: [1, 2, 3, 4, 5]
      },
      resourceTypes: {
        userAccess: [1, 2, 3, 4, 5]
      },
      ruleEngine: {
        userAccess: [1, 2, 3, 4, 5]
      },
      settings: {
        userAccess: [1, 5]
      },
      requests: {
        userAccess: [1, 5]
      },
    };

    function checkUser(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === userInfoRoleTypeCode) {
          userViewAccess = true;
          return;
        }
      }
    }

    switch (view) {
      case "dashboard":
        checkUser(dashboardTypeRoleArray.dashboard.userAccess);
        break;
      case "individuals":
        checkUser(dashboardTypeRoleArray.individuals.userAccess);
        break;
      case "organization":
        checkUser(dashboardTypeRoleArray.organization.userAccess);
        break;
      case "products":
        checkUser(dashboardTypeRoleArray.products.userAccess);
        break;
      case "offers":
        checkUser(dashboardTypeRoleArray.offers.userAccess);
        break;
      case "services":
        checkUser(dashboardTypeRoleArray.services.userAccess);
        break;
      case "resources":
        checkUser(dashboardTypeRoleArray.resources.userAccess);
        break;
      case "ruleEngine":
        checkUser(dashboardTypeRoleArray.ruleEngine.userAccess);
        break;
      case "settings":
        checkUser(dashboardTypeRoleArray.settings.userAccess);
        break;
      case "requests":
        checkUser(dashboardTypeRoleArray.requests.userAccess);
        break;
      case "profile":
        checkUser(dashboardTypeRoleArray.profile.userAccess);
        break;
      case "resourceTypes":
        checkUser(dashboardTypeRoleArray.resourceTypes.userAccess);
        break;

      default:
      // code block
    }
    return userViewAccess;
    // this is fake solution. --finish code--
  }
}
