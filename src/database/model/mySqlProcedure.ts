const enum Proc {
  login = 'call proc_login_operation(?)',
  keystore = 'call proc_key_store_operation(?)',
  admin = "call proc_admin_operation(?)",
  groupChats = "call proc_group_operation(?)",
}
export default Proc;
