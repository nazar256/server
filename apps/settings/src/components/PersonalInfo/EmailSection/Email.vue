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
	<div>
		<input
			ref="email"
			type="email"
			:name="inputName"
			:placeholder="inputPlaceholder"
			:value="email"
			autocapitalize="none"
			autocomplete="on"
			autocorrect="off"
			required="true"
			@input="onEmailChange"
			@keyup.enter.stop.prevent="onEmailChange">

		<transition name="fade">
			<span v-if="showCheckmarkIcon" class="icon-checkmark" />
			<span v-else-if="showErrorIcon" class="icon-error" />
		</transition>

		<em v-if="primary">
			{{ t('settings', 'Primary email for password reset and notifications') }}
		</em>
	</div>
</template>

<script>
import { showError } from '@nextcloud/dialogs'
import '@nextcloud/dialogs/styles/toast.scss'
import { setPrimaryEmail, setAdditionalEmails } from '../../../service/PersonalInfoService'

export default {
	name: 'Email',

	props: {
		email: {
			type: String,
			required: true,
		},
		primary: {
			type: Boolean,
			default: false,
		},
		index: {
			type: Number,
			default: 0,
		},
	},

	data() {
		return {
			showCheckmarkIcon: false,
			showErrorIcon: false,
		}
	},

	computed: {
		inputName() {
			if (this.primary) {
				return 'email'
			}
			return 'additionalEmail[]'
		},
		inputPlaceholder() {
			if (this.primary) {
				return t('settings', 'Your email address')
			}
			return t('settings', 'Additional email address {index}', { index: this.index })
		},
	},

	methods: {
		onEmailChange(e) {
			this.$emit('update:email', e.target.value)

			// Only save to server if valid
			if (this.$refs.email?.checkValidity()) {
				//
			}
		},
	},
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
