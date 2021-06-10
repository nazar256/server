<!--
  - @copyright 2021 Christopher Ng <chrng8@gmail.com>
  -
  - @author 2021 Christopher Ng <chrng8@gmail.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->

<template>
	<fragment>
		<input
			type="email"
			name="email"
			id="email"
			:value="email.value"
			@input="updateEmailState"
			@keyup.enter.stop.prevent="updateEmail"
			:class="{ hidden: hideEmailInput }"
			:placeholder="t('settings', 'Your email address')"
			autocomplete="on"
			autocapitalize="none"
			autocorrect="off" />
		<div>
			<transition name="fade">
				<span v-if="showCheckmarkIcon" class="icon-checkmark"></span>
			</transition>
			<transition name="fade">
				<span v-if="showErrorIcon" class="icon-error"></span>
			</transition>
		</div>
		<span v-if="hideEmailInput">
			{{ email.value || t('settings', 'No email address set') }}
		</span>
		<em v-if="!hideEmailInput">
			{{ t('settings', 'Primary email for password reset and notifications') }}
		</em>
		<input type="hidden" id="emailscope" :value="email.scope" />
	</fragment>
</template>

<script>
import { showError } from '@nextcloud/dialogs'
import '@nextcloud/dialogs/styles/toast.scss'
import { setPrimaryEmail } from '../../../service/PersonalInfoService'

export default {
	name: 'PrimaryEmail',
	props: {
		displayNameChangeSupported: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		email() {
			return this.$store.state.primaryEmail
		},
	},
	methods: {
		updateEmailState(e) {
			this.$store.commit('setPrimaryEmail', { ...this.email, value: e.target.value })
		},
		async updateEmail() {
			const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (emailRegex.test(this.email.value)) {
				try {
					const responseData = await setPrimaryEmail(this.email.value)
					this.logger.debug('Response data', responseData.ocs.meta)

					if (responseData.ocs.meta.status === 'ok') {
						this.showCheckmarkIcon = true
						setTimeout(() => { this.showCheckmarkIcon = false }, 2000)
					} else {
						this.showErrorIcon = true
						setTimeout(() => { this.showErrorIcon = false }, 2000)
					}
				} catch (e) {
					this.logger.error('Unable to update primary email address', e)
					showError(t('settings', 'An error happened while updating the primary email address'))
				}
			}
		},
	},
	data() {
		return {
			hideEmailInput: !this.displayNameChangeSupported,
			showCheckmarkIcon: false,
			showErrorIcon: false,
		}
	}
}
</script>

<style lang="scss" scoped>
	.fade-enter-active {
		transition: opacity 200ms ease-out;
	}
	.fade-leave-active {
		transition: opacity 300ms ease-out;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
