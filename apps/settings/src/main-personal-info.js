/**
 * @copyright 2021, Christopher Ng <chrng8@gmail.com>
 *
 * @author Christopher Ng <chrng8@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Vue from 'vue'
import { loadState } from '@nextcloud/initial-state'
// eslint-disable-next-line node/no-unpublished-import
import { Plugin as FragmentPlugin } from 'vue-fragment'

import logger from './logger'

import EmailSection from './components/PersonalInfo/EmailSection/EmailSection'
import store from './store/personal-info'

// eslint-disable-next-line camelcase
__webpack_nonce__ = btoa(OC.requestToken)

Vue.prototype.t = t
Vue.prototype.logger = logger

Vue.use(FragmentPlugin)

const View = Vue.extend(EmailSection)
new View({
	propsData: {
		initialEmails: loadState('settings', 'emails'),
		accountParams: loadState('settings', 'accountParameters'),
	},
	store,
}).$mount('#vue-emailform')
