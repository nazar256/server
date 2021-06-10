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
	<h3>
		<label for="email">{{ t('settings', 'Email') }}</label>
		<a href="#" class="federation-menu" :aria-label="t('settings', 'Change privacy level of email')">
			<span class="icon-federation-menu icon-password">
				<span class="icon-triangle-s"></span>
			</span>
		</a>
		<Actions class="actions" :disabled="disableAddAdditionalEmail">
			<ActionButton icon="icon-add" @click.stop.prevent="addAdditionalEmail">
				{{ t('settings', 'Add email address') }}
			</ActionButton>
		</Actions>
	</h3>
</template>

<script>
import { Actions, ActionButton } from '@nextcloud/vue'

export default {
	name: 'Heading',
	components: {
		Actions,
		ActionButton,
	},
	computed: {
		additionalEmails() {
			return this.$store.state.additionalEmails
		},
		disableAddAdditionalEmail() {
			return !this.additionalEmails.every(({ value }) => value !== '')
		},
	},
	methods: {
		/* eslint-disable */
		addAdditionalEmail() {
			if (this.additionalEmails.every(({ value }) => value !== '')) {
				console.log('before commit', JSON.stringify(this.additionalEmails))
				this.$store.commit('addAdditionalEmail', { value: '' })
				console.log('after commit', JSON.stringify(this.additionalEmails))
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	.actions {
		// TODO do this a less hacky way
		margin: -12px 0 0 2px !important;
	}
</style>
