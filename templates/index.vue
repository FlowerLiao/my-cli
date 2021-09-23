/**
 * templates\index.vue
 *
 */
 <template>
	<div>
		<section class="search-area">
			这里是搜索区
		</section>
		<section class="table-area">
			这里是表格区
		</section>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "<%= name %>",
		data(){
			return {
				//查询数据
				searchData: {},
				//表格数据
				tableData: []
			}
		},
		created(){
			this.getDataList();
		},
		methods: {
			//获取数据
			getDataList(){

			},
			//添加数据
			addData(){
				
			},
			//编辑数据
			editData(){

			},
			//删除数据
			deleteData(){

			}
		}
	}
</script>

<style lang="scss">
	
</style>